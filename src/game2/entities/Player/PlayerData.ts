export type PlayerGender = "Male" | "Female";
export type PlayerClass = "rogue" | "knight" | "wizard";

export interface PlayerData {
  gender: PlayerGender;
  class: PlayerClass;
}
