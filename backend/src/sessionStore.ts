export interface Session {
  id: string;
  userId: string;
  userName: string;
  expire: Date;
}

export interface SessionStore {
  getSession(id: string): Session | undefined;
  setSession(session: Session): void;
}

export class InMemorySessionStore {
  private sessions: Map<string, Session> = new Map();

  public getSession(id: string) {
    return this.sessions.get(id);
  }

  public setSession(session: Session) {
    this.sessions.set(session.id, session);
  }
}

const sessionStore: SessionStore = new InMemorySessionStore();

export default sessionStore;
