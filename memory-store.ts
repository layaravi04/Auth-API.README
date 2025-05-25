// Simple in-memory store for demo purposes
interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

class MemoryStore {
  private users: User[] = []

  addUser(user: User): void {
    this.users.push(user)
  }

  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email)
  }

  findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  getAllUsers(): User[] {
    return this.users
  }

  getUserCount(): number {
    return this.users.length
  }
}

// Create a singleton instance
const memoryStore = new MemoryStore()

export default memoryStore
