import { LevelWiseCollisionBoxData } from "@/types/dataTypes";
import { CollisionBox } from "@/utils/classes/CollisionBox";
import { createSlice } from "@reduxjs/toolkit";

// Explicitly export the type
export interface GameLevelState {
    levelMatrixNumber: number;
    levelCompleted: number[];
    collisionBoxes:LevelWiseCollisionBoxData[]
}

const initialState: GameLevelState = {
    levelMatrixNumber: 3,
    levelCompleted:[1],
    collisionBoxes: [
        {
            level: 1,
            collisionBoxes: [
                new CollisionBox('right', 100, 60, '#FF0000'),
                new CollisionBox('left', 300, 60, '#00FF00'),
            ],
        },
    ]
};

function parseCollisionBoxes(boxesStr: string): CollisionBox[] {
    // 1) remove the leading/trailing [ ] and any whitespace/newlines
    const inner = boxesStr.trim().replace(/^\[|\]$/g, "");
  
    if (!inner) return [];
  
    // 2) split into individual “{…}” chunks
    //    we strip the braces here, so you get strings like "'top','right',60,'#ff0000'"
    const tuples = inner
      .split(/}\s*,\s*{/)    // splits on "},{" roughly
      .map(s => s.replace(/^{|}$/g, "").trim());
  
    return tuples.map(tuple => {
      // 3) split on commas, strip single quotes & whitespace
      const parts = tuple.split(",").map(p => p.trim().replace(/^'|'$/g, ""));
  
      // parts now is [ locY, locX, sizeStr, colorStr ]
      const [ locXraw, locYraw, sizeStr, color ] = parts;
  
      // 4) convert size to number
      const size = Number(sizeStr);
  
      // 5) decide if locX/raw are numeric or keywords
      const locX = locXraw === "left" || locXraw === "right"
        ? (locXraw as "left" | "right")
        : Number(locXraw);
      const locY = locYraw === "top" || locYraw === "bottom"
        ? (locYraw as "top" | "bottom")
        : Number(locYraw);
  
      // 6) instantiate
      return new CollisionBox(locX, locY, size, color);
    });
  }

const gameLevelSlice = createSlice({
    name: "gameLevel",
    initialState,
    reducers: {
        setLevelMatrixNumber: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                levelMatrixNumber: payload,
            };
        },
        setLevelSettings: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                levelMatrixNumber: payload.LevelMatrix,
                levelCompleted: payload.Completed.split(",").map(Number),
                collisionBoxes: [
                    {
                        level: 1,
                        collisionBoxes: parseCollisionBoxes(payload.Boxes),
                    },
                ]
            };

        }

    },
});

export const { setLevelMatrixNumber,setLevelSettings } = gameLevelSlice.actions;
export default gameLevelSlice.reducer;
