export default class User {
  constructor(
    public id: string,
    public username: string,
    public seat: number | undefined
  ) {}
}
