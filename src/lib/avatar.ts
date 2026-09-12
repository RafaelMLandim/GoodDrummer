/** Avatar cartoonesco gerado a partir de uma seed estável (nome + timestamp de criação). */
export function avatarUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&radius=50`;
}
