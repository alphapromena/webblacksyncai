import { type User, type InsertUser, type Lead, type InsertLead, type EnterpriseLead, type InsertEnterpriseLead } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  createEnterpriseLead(lead: InsertEnterpriseLead): Promise<EnterpriseLead>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private enterpriseLeads: Map<string, EnterpriseLead>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.enterpriseLeads = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = {
      id,
      createdAt: new Date(),
      name: insertLead.name,
      email: insertLead.email,
      company: insertLead.company ?? null,
      message: insertLead.message ?? null,
      phone: insertLead.phone ?? null,
      industry: insertLead.industry ?? null,
      teamSize: insertLead.teamSize ?? null,
      useCase: insertLead.useCase ?? null,
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values());
  }

  async createEnterpriseLead(insertLead: InsertEnterpriseLead): Promise<EnterpriseLead> {
    const id = randomUUID();
    const lead: EnterpriseLead = {
      ...insertLead,
      id,
      createdAt: new Date(),
      phone: insertLead.phone ?? null,
      useCase: insertLead.useCase ?? null,
    };
    this.enterpriseLeads.set(id, lead);
    return lead;
  }
}

export const storage = new MemStorage();
