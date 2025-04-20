// pages/api/game-settings.ts

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const SCRIPT_URL = process.env.GAME_SETTINGS_URL
  || "https://script.google.com/macros/s/AKfycbzFi-KbXMRoMdDSXeVwkWpse4mXxch1AnrGgRcRguqJ_aSnQXkmYVx8E6RBQoEgbEDn/exec";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    // Fetch using axios
    const { data } = await axios.get(SCRIPT_URL);
    // Send the JSON straight through
    res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching Game_Settings:", error.message || error);
    res
      .status(error.response?.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
}
