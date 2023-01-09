import faunadb from "faunadb";

export const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
});

export const {
  Add,
  Collection,
  Create,
  Delete,
  Get,
  Index,
  Lambda,
  Let,
  Map,
  Match,
  Paginate,
  Ref,
  Select,
  Sum,
  Update,
  Var,
} = faunadb.query;
