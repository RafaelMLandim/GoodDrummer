interface LevelOption {
  id: string;
  name: string;
  worldName: string;
}

export function LevelSelect({
  levels,
  defaultValue,
  name = "levelId",
}: {
  levels: LevelOption[];
  defaultValue?: string;
  name?: string;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue ?? levels[0]?.id}
      required
      className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 font-semibold text-slate-800 outline-none focus:border-sky-400"
    >
      {levels.map((level) => (
        <option key={level.id} value={level.id}>
          {level.name} — {level.worldName}
        </option>
      ))}
    </select>
  );
}
