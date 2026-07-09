export const leaderboard = [
  { rank: 1, name: 'Shadow Knight', avatar: '⚫', rating: 2847, xp: 128400, wins: 156, losses: 23 },
  { rank: 2, name: 'Flame Mage', avatar: '🔥', rating: 2801, xp: 121900, wins: 148, losses: 28 },
  { rank: 3, name: 'Ice Wizard', avatar: '❄️', rating: 2756, xp: 118200, wins: 142, losses: 31 },
  { rank: 4, name: 'Storm Archer', avatar: '⚡', rating: 2612, xp: 104500, wins: 135, losses: 39 },
  { rank: 5, name: 'Void Rogue', avatar: '🌑', rating: 2588, xp: 99800, wins: 129, losses: 41 },
  { rank: 6, name: 'Crimson Paladin', avatar: '🩸', rating: 2540, xp: 95200, wins: 118, losses: 44 },
  { rank: 7, name: 'Moss Druid', avatar: '🌿', rating: 2501, xp: 90100, wins: 110, losses: 47 },
  { rank: 8, name: 'Brave Coder', avatar: '⚔️', rating: 2450, xp: 87600, wins: 42, losses: 12 },
  { rank: 9, name: 'Iron Bard', avatar: '🎻', rating: 2398, xp: 82300, wins: 101, losses: 52 },
  { rank: 10, name: 'Ash Ranger', avatar: '🏹', rating: 2340, xp: 78900, wins: 97, losses: 55 },
];

export const seasons = {
  'Season 3 (Current)': leaderboard,
  'Season 2': [
    { rank: 1, name: 'Flame Mage', avatar: '🔥', rating: 2790, xp: 110300, wins: 130, losses: 30 },
    { rank: 2, name: 'Shadow Knight', avatar: '⚫', rating: 2755, xp: 108900, wins: 126, losses: 33 },
    { rank: 3, name: 'Storm Archer', avatar: '⚡', rating: 2701, xp: 101200, wins: 119, losses: 37 },
    { rank: 4, name: 'Ice Wizard', avatar: '❄️', rating: 2688, xp: 98700, wins: 114, losses: 40 },
    { rank: 5, name: 'Brave Coder', avatar: '⚔️', rating: 2210, xp: 61200, wins: 30, losses: 15 },
    { rank: 6, name: 'Void Rogue', avatar: '🌑', rating: 2490, xp: 84300, wins: 102, losses: 46 },
    { rank: 7, name: 'Moss Druid', avatar: '🌿', rating: 2455, xp: 79800, wins: 96, losses: 49 },
    { rank: 8, name: 'Iron Bard', avatar: '🎻', rating: 2390, xp: 74100, wins: 90, losses: 53 },
  ],
  'Season 1': [
    { rank: 1, name: 'Ice Wizard', avatar: '❄️', rating: 2640, xp: 89200, wins: 108, losses: 34 },
    { rank: 2, name: 'Shadow Knight', avatar: '⚫', rating: 2601, xp: 86700, wins: 104, losses: 36 },
    { rank: 3, name: 'Crimson Paladin', avatar: '🩸', rating: 2560, xp: 82100, wins: 99, losses: 38 },
    { rank: 4, name: 'Flame Mage', avatar: '🔥', rating: 2522, xp: 78400, wins: 95, losses: 41 },
    { rank: 5, name: 'Ash Ranger', avatar: '🏹', rating: 2470, xp: 73900, wins: 89, losses: 45 },
    { rank: 6, name: 'Brave Coder', avatar: '⚔️', rating: 1980, xp: 38500, wins: 14, losses: 9 },
  ],
};

const opponentNames = [
  { name: 'Shadow Knight', avatar: '⚫' },
  { name: 'Flame Mage', avatar: '🔥' },
  { name: 'Ice Wizard', avatar: '❄️' },
  { name: 'Storm Archer', avatar: '⚡' },
  { name: 'Void Rogue', avatar: '🌑' },
];

export function randomOpponent(rating) {
  const pick = opponentNames[Math.floor(Math.random() * opponentNames.length)];
  const spread = Math.floor(Math.random() * 160) - 80;
  return { ...pick, rating: Math.max(800, rating + spread) };
}
