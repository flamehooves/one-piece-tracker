import type { Episode } from '../types';
import { ARC_DEFINITIONS } from './arcs';

const NOTABLE_TITLES: Record<number, string> = {
  1: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!",
  2: "The Great Swordsman Appears! Pirate Hunter Roronoa Zoro!",
  3: "Morgan VS Luffy! Who's This Beautiful Young Girl?",
  4: "Luffy's Past! The Red-Haired Shanks Appears!",
  5: "Fear, Mysterious Power! Pirate Clown Captain Buggy!",
  6: "Desperate Situation! Beast Tamer Mohji vs. Luffy!",
  7: "The Terrifying Duo! Meowban Brothers vs. Zoro!",
  8: "Who Is the Victor? Devil Fruit Power Showdown!",
  9: "The Honorable Liar? Captain Usopp!",
  10: "The High-Spirited Usoppu! The Man Who Inherits Shanks' Will!",
  11: "Reveal the Secret! Pirate Usopp's Great Endeavors!",
  12: "Clash with the Black Cat Pirates! The Great Battle on the Slope!",
  13: "The Terrifying Duo and Cruel Reality — Usopp's Tears!",
  14: "Luffy Back in Action! Kuro vs Luffy! Final Battle!",
  15: "Beat Kuro! Nami's Courage and the Straw Hat!",
  18: "You're the Weird Creature! Gaimon and His Strange Friends!",
  19: "The Famous Cook! Sanji of the Floating Restaurant!",
  20: "Krieg's Threat! The Pirate Fleet is Formed!",
  24: "Enter the Great Swordsman! Mihawk — Dark Blade — Appears!",
  25: "The Bravest! Zoro's Sword Oath!",
  31: "The Worst in the East! An Infamous Pirate Ship Has Landed!",
  36: "Surviving Through the Sky! The Weather Science of Nami!",
  44: "Goodbye my Hometown, Cocoyasi Village!",
  45: "Bounty! Straw Hat Luffy Becomes Famous!",
  61: "An Unlikely Pair: The Pirate and the Whale!",
  92: "The Alabasta War Front! Luffy vs Vivi!",
  100: "Vivi Tells the Story of Her Adventure! The Tears of Princess Vivi!",
  110: "Merciless Mortal Combat! Luffy vs Crocodile Round 1!",
  120: "The Sand-Sand Clan's Secret Base! The Battle for Alabasta Begins!",
  130: "Alabasta's Hero and a Gutsy Fellow! The Life-Risking Duel!",
  144: "Hard Battles, One After Another! Devil Fruit Users vs Devil Fruit Users!",
  153: "We Are Your Friends!! The Rain-Summoning Powder and the Rebel Army",
  157: "Chopper's Kingdom on the Top of the Mast! The Country of Love is Shaking!",
  167: "Climb Giant Jack! Desperate Struggle in the Upper Ruins!",
  193: "Boss Luffy is the Culprit?! Track Down the Missing Great Cherry Tree!",
  195: "Eternal Friends! The Bell of Oath Echoes Throughout the Giant Ocean!",
  229: "Exceed the Limits of the Strongest! Shanks' Arrival!",
  234: "The Legendary Pirate Emerges! The Mysterious Figure is Revealed!",
  253: "Robin Betrayed! The Darkness Within Robin!",
  264: "Scramble Over Robin! A Mermaid Appears in the Fog!",
  278: "Say You Want to Live! We Are Your Friends!",
  283: "The Ways of Men! Zoro's Desperate Fight!",
  289: "Demon of the Sea! Kidd's Ambition!",
  293: "Key to Their Future — Luffy vs. Lucci!",
  302: "Peak of the Decisive Battle! Luffy vs. Lucci!",
  309: "Luffy and Lucci — Burning Ambitions Face Each Other!",
  312: "Fly through the Sky, Luffy! The Buster Call Roundup!",
  325: "The Dream Sails On! The Straw Hats Land at Thriller Bark!",
  336: "Special Historical Arc — Boss Luffy Appears Again!",
  337: "Venture into the Unknown! The Straw Hats Land at Thriller Bark!",
  377: "The Promise on that Day — Zoro vs. Oars!",
  381: "The Morning Sun Pierces through the Nightmare Island!",
  385: "Landing! The Scattered Straw Hats!",
  400: "Luffy's Road to Victory",
  405: "The Crew's Whereabouts! The Chaos in a Separate Room!",
  408: "Landing on Amazon Lily! Attacking the Master of the Island",
  421: "A Treasure Passed Down the Generations! The Mystery of the Snake Princess",
  422: "The Prison Impel Down!",
  457: "A Difficult Path to Victory! Luffy's Final Decision!",
  458: "Escaping the Darkness! The Slumming Luffy!",
  459: "The Execution Begins — Break through the Encirclement!",
  480: "Looking for the Answer — Fire Fist Ace Dies on the Battlefield!",
  483: "Luffy Loses Consciousness! Hoist the Counterattack Signal!",
  489: "Powerful Rivals Gather! The Battle of the New Era!",
  500: "Luffy and Boa Hancock — The Yonko's Territory",
  516: "The Disappearing Crew! The Final Days of the Straw Hat Crew!",
  517: "2 Years Later — Reunion at Sabaody Archipelago!",
  523: "The All-New Straw Hat Crew Departs! Fishman Island Arc Begins!",
  574: "Fierce Battle! Luffy vs. Hody!",
  579: "The Straw Hats Arrive! Tashigi's Tears!",
  600: "Save Kinemon! Dressrosa Operation SOP!",
  625: "G-5's Parting! Departure to Dressrosa!",
  629: "The Corrida Colosseum! The Fighting Fish Strike!",
  700: "The Summit Battle! Colosseum Fighters!",
  746: "The Colosseum of Carnage! Doflamingo's Secret!",
  751: "A Adventure on the Giant Elephant! The Sealed World of the Mink Tribe!",
  779: "The End of the Dressrosa Battle — Farewell Strawhats!",
  783: "Sanji's Father! A World Shocking Revelation!",
  800: "The Underworld! The Clandestine Ship Hiding in a Fog!",
  877: "Escape! The Emperor's Descent!",
  878: "The World in Shock — The Holy Land Reverie is Held!",
  889: "Foreboding of a New Era! The Navy's Secret Meeting!",
  890: "Marco! The Keeper of Whitebeard's Last Memento!",
  957: "Ultimate Military Force — A Full Navy Mobilization Against the Yonko!",
  1000: "Straw Hat Luffy — The Man Who Will Become the King of the Pirates!",
  1015: "Chains! The Master and Crewmates!",
  1029: "Overwhelming Power! An Outburst of Haki!",
  1050: "Luffy's Peak — Attained! Gear Five!",
  1070: "The Strongest Creature! Kaido Falls!",
  1085: "The Final Curtain! Dawn of Wano!",
  1086: "The Truth About the Final Island! The Scientist God Vegapunk!",
  1122: "The Future That Cannot Be Changed — The Straw Hats' Final Journey!",
};

function generateTitle(epNum: number, arcName: string): string {
  const title = NOTABLE_TITLES[epNum];
  if (title) return title;
  return `${arcName} — Episode ${epNum}`;
}

function generateEpisodes(): Episode[] {
  const episodes: Episode[] = [];

  for (const arc of ARC_DEFINITIONS) {
    for (let n = arc.startEp; n <= arc.endEp; n++) {
      episodes.push({
        number: n,
        title: generateTitle(n, arc.name),
        arcId: arc.id,
        arcName: arc.name,
        saga: arc.saga,
        isFiller: arc.isFiller,
      });
    }
  }

  // Sort by episode number (arcs are already in order but just in case)
  episodes.sort((a, b) => a.number - b.number);
  return episodes;
}

export const ALL_EPISODES: Episode[] = generateEpisodes();

export function getEpisodeByNumber(n: number): Episode | undefined {
  return ALL_EPISODES.find(e => e.number === n);
}
