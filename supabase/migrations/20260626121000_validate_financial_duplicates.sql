-- Valida duplicidades financeiras dentro do JSON salvo em public.workspace_state.
-- A regra replica o alerta do app: mesma categoria, mesma competencia e mesmo imovel.
-- Receitas usam a categoria fixa "receita" e tambem conferem o contrato.

create or replace function public.validate_workspace_state_financial_duplicates()
returns trigger
language plpgsql
as $$
declare
  duplicate_expense record;
  duplicate_payment record;
begin
  with expenses as (
    select
      item->>'id' as id,
      item->>'propertyId' as property_id,
      lower(trim(coalesce(item->>'expenseType', ''))) as category,
      coalesce(item->>'competence', left(coalesce(item->>'expenseDate', ''), 7)) as competence
    from jsonb_array_elements(coalesce(new.data->'expenses', '[]'::jsonb)) item
  )
  select property_id, category, competence, count(*) as total
    into duplicate_expense
  from expenses
  where property_id <> '' and category <> '' and competence <> ''
  group by property_id, category, competence
  having count(*) > 1
  limit 1;

  if found then
    raise exception
      'Despesa duplicada para o imovel %, categoria %, competencia %',
      duplicate_expense.property_id,
      duplicate_expense.category,
      duplicate_expense.competence
      using errcode = '23505';
  end if;

  with payments as (
    select
      item->>'id' as id,
      item->>'propertyId' as property_id,
      item->>'contractId' as contract_id,
      coalesce(item->>'competence', left(coalesce(item->>'paymentDate', ''), 7)) as competence
    from jsonb_array_elements(coalesce(new.data->'payments', '[]'::jsonb)) item
  )
  select property_id, contract_id, competence, count(*) as total
    into duplicate_payment
  from payments
  where property_id <> '' and contract_id <> '' and competence <> ''
  group by property_id, contract_id, competence
  having count(*) > 1
  limit 1;

  if found then
    raise exception
      'Receita duplicada para o imovel %, contrato %, competencia %',
      duplicate_payment.property_id,
      duplicate_payment.contract_id,
      duplicate_payment.competence
      using errcode = '23505';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_validate_workspace_state_financial_duplicates on public.workspace_state;

create trigger trg_validate_workspace_state_financial_duplicates
before insert or update of data on public.workspace_state
for each row
execute function public.validate_workspace_state_financial_duplicates();