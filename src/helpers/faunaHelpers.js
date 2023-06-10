import faunadb from "faunadb";

export const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
});

export const {
  Add,
  Collection,
  Create,
  CreateIndex,
  Delete,
  Documents,
  Equals,
  Exists,
  Filter,
  Foreach,
  Get,
  If,
  Index,
  Lambda,
  Let,
  Map,
  Match,
  Or,
  Paginate,
  Ref,
  Select,
  Sum,
  Union,
  Update,
  Var,
} = faunadb.query;
