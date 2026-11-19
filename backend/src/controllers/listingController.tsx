import type { Request, Response } from "express";
import { readFileSync } from "node:fs";

// Test data only. Every unit in listings.json is fictional.
export interface Listing {
  id: string;
  building_name: string | null;
  address: string | null;
  unit_number: string | null;
  neighborhood: string | null;
  square_feet: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  rent: number | null;
  date_of_availability: string | null;
  wheelchair_width_doors: string | null;
  roll_in_shower: string | null;
  grab_bars: string | null;
  elevator_access: string | null;
  kitchen_accessible: string | null;
  income_restricted: string | null;
  occupied: string | null;
  special_features: string | null;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
}

const LISTINGS_FILE = new URL("../listings.json", import.meta.url);

// Read the file on each request so edits to listings.json show up without a restart.
const loadListings = (): Listing[] => JSON.parse(readFileSync(LISTINGS_FILE, "utf8")) as Listing[];

// Common misspelling carried over from the original Supabase search.
const normalize = (query: string) => query.trim().replace(/capital hill/gi, "Capitol Hill").toLowerCase();

// GET /listings?neighborhood=... (case-insensitive partial match; no filter returns all)
export const getList = (req: Request, res: Response) => {
  const raw = req.query.neighborhood;
  const query = typeof raw === "string" ? normalize(raw) : "";
  const listings = loadListings();
  res.json(query ? listings.filter((l) => l.neighborhood?.toLowerCase().includes(query)) : listings);
};

// GET /listings/:id
export const getDetail = (req: Request, res: Response) => {
  const listing = loadListings().find((l) => l.id === req.params.id);
  if (!listing) {
    res.status(404).json({ error: "Listing not found" });
    return;
  }
  res.json(listing);
};

export const postListing = (req: Request, res: Response) => {
  // res.send("creates a listing");
  res.sendStatus(201);
};

export const updateListing = (req: Request, res: Response) => {
  res.send("updates a listing");
  // res.sendStatus(200);
};
