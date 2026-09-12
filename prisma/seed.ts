import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, LevelColor, ModuleCategory, ExerciseType } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

interface ExerciseSeed {
  name: string;
  type: ExerciseType;
  teacherTip: string;
  detail?: string;
  targetBpm?: number;
  artist?: string;
}

interface ModuleSeed {
  name: string;
  category: ModuleCategory;
  exercises: ExerciseSeed[];
}

interface LevelSeed {
  order: number;
  name: string;
  worldName: string;
  color: LevelColor;
  globalGoal: string;
  modules: ModuleSeed[];
}

const curriculum: LevelSeed[] = [
  {
    order: 1,
    name: "Iniciante",
    worldName: "Mundo 1 - Os Primeiros Toques",
    color: LevelColor.GREEN,
    globalGoal:
      "Dominar postura, tempo constante, leitura básica de semínimas e colcheias e grooves 4/4 sem oscilar.",
    modules: [
      {
        name: "Rudimentos & Técnica",
        category: ModuleCategory.RUDIMENTOS_TECNICA,
        exercises: [
          {
            name: "Single Stroke Roll (Toque Simples)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Execução limpa em colcheias e semicolcheias.",
            targetBpm: 80,
          },
          {
            name: "Double Stroke Roll (Toque Duplo)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Controle de rebote com pulso.",
            targetBpm: 60,
          },
          {
            name: "Single Paradiddle (RLRR LRLL)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Acentuação na primeira nota.",
            targetBpm: 70,
          },
          {
            name: "Postura & Grip",
            type: ExerciseType.TECNICA,
            teacherTip:
              "Pegada Match Grip correta, ponto de pivô das baquetas e altura de banco.",
          },
        ],
      },
      {
        name: "Grooves & Ritmos",
        category: ModuleCategory.GROOVES_RITMOS,
        exercises: [
          {
            name: "Pop/Rock Padrão 1",
            type: ExerciseType.GROOVE,
            teacherTip: "Chimbal em 8ªs, Bumbo no 1 e 3, Caixa no 2 e 4.",
          },
          {
            name: "Pop/Rock Padrão 2",
            type: ExerciseType.GROOVE,
            teacherTip: "Bumbo sincopado (1 e 3 e).",
          },
          {
            name: "Abertura de Chimbal",
            type: ExerciseType.GROOVE,
            teacherTip: "Condução simples marcando o off-beat com abertura no 'e'.",
          },
        ],
      },
      {
        name: "Leitura & Teoria",
        category: ModuleCategory.LEITURA_TEORIA,
        exercises: [
          {
            name: "Leitura de figuração básica",
            type: ExerciseType.LEITURA,
            teacherTip: "Semínima, Colcheia e Pausas equivalentes em 4/4.",
          },
          {
            name: "Mapeamento de peças do kit na partitura",
            type: ExerciseType.LEITURA,
            teacherTip: "Bumbo, Caixa, Prato de Condução, Chimbal e Tons.",
          },
        ],
      },
      {
        name: "Viradas (Fills)",
        category: ModuleCategory.VIRADAS_FILLS,
        exercises: [
          {
            name: "Viradas lineares de 1 tempo na caixa",
            type: ExerciseType.VIRADA,
            teacherTip: "Semicolcheias.",
          },
          {
            name: "Viradas descendentes pela bateria",
            type: ExerciseType.VIRADA,
            teacherTip:
              "Caixa -> Tom 1 -> Tom 2 -> Surdo, finalizando no prato de ataque no tempo 1.",
          },
        ],
      },
      {
        name: "Repertório (Desafios do Nível)",
        category: ModuleCategory.REPERTORIO,
        exercises: [
          {
            name: "Yellow",
            artist: "Coldplay",
            type: ExerciseType.MUSICA,
            teacherTip: "Groove constante, tempo lento.",
          },
          {
            name: "Another One Bites the Dust",
            artist: "Queen",
            type: ExerciseType.MUSICA,
            teacherTip: "Precisão de bumbo/caixa.",
          },
          {
            name: "Back in Black",
            artist: "AC/DC",
            type: ExerciseType.MUSICA,
            teacherTip: "Controle de tempo e acentuação.",
          },
        ],
      },
    ],
  },
  {
    order: 2,
    name: "Intermediário",
    worldName: "Mundo 2 - Dominando o Groove",
    color: LevelColor.YELLOW,
    globalGoal:
      "Independência de bumbo, dinâmicas (ghost notes), introdução ao shuffle e rudimentos com acento.",
    modules: [
      {
        name: "Rudimentos & Técnica",
        category: ModuleCategory.RUDIMENTOS_TECNICA,
        exercises: [
          {
            name: "Flam & Drag",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Execução com nota de apoio baixa e nota principal alta.",
          },
          {
            name: "Paradiddle-Diddle (RLRRLL)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Execução fluida em acentuação ternária/sextinas.",
          },
          {
            name: "Five-Stroke Roll & Seven-Stroke Roll",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Aplicação em entradas de compasso.",
          },
          {
            name: "Técnica de Pés",
            type: ExerciseType.TECNICA,
            teacherTip:
              "Calcanhar levantado (Heel-up) e técnica de slide para toques duplos no bumbo.",
          },
        ],
      },
      {
        name: "Grooves & Independência",
        category: ModuleCategory.GROOVES_RITMOS,
        exercises: [
          {
            name: "Funk/Pop com Ghost Notes",
            type: ExerciseType.GROOVE,
            teacherTip: "Caixa acentuada no 2 e 4 com notas fantasma no mi-e-a.",
          },
          {
            name: "Disco/Dance Groove",
            type: ExerciseType.GROOVE,
            teacherTip:
              "Chimbal aberto em todas as colcheias off-beat com bumbo em 4 na linha.",
          },
          {
            name: "Bossa Nova & Samba Básico",
            type: ExerciseType.GROOVE,
            teacherTip: "Condução no aro (Cross-stick) com padrão de bumbo sincopado.",
          },
          {
            name: "Shuffle/Blues",
            type: ExerciseType.GROOVE,
            teacherTip: "Condução em tercinas de colcheia (Triplets) com caixa no 2 e 4.",
          },
        ],
      },
      {
        name: "Leitura & Teoria",
        category: ModuleCategory.LEITURA_TEORIA,
        exercises: [
          {
            name: "Leitura completa de semicolcheias e subdivisões",
            type: ExerciseType.LEITURA,
            teacherTip: "Galope, inverso de galope, colcheia com duas semicolcheias.",
          },
          {
            name: "Fórmula de compasso 3/4 e 6/8",
            type: ExerciseType.LEITURA,
            teacherTip: "Sentir e contar as novas fórmulas de compasso com naturalidade.",
          },
        ],
      },
      {
        name: "Viradas (Fills)",
        category: ModuleCategory.VIRADAS_FILLS,
        exercises: [
          {
            name: "Fills utilizando Flams e bumbos intercalados",
            type: ExerciseType.VIRADA,
            teacherTip: "Combinar flams com bumbos intercalados mantendo o pulso.",
          },
          {
            name: "Viradas com subdivisão de tercinas pela bateria",
            type: ExerciseType.VIRADA,
            teacherTip: "Distribuir tercinas por todo o kit com fluidez.",
          },
        ],
      },
      {
        name: "Repertório",
        category: ModuleCategory.REPERTORIO,
        exercises: [
          {
            name: "Superstition",
            artist: "Stevie Wonder",
            type: ExerciseType.MUSICA,
            teacherTip: "Groove e independência.",
          },
          {
            name: "Come Together",
            artist: "The Beatles",
            type: ExerciseType.MUSICA,
            teacherTip: "Uso de tons e dinâmica.",
          },
          {
            name: "Californication",
            artist: "Red Hot Chili Peppers",
            type: ExerciseType.MUSICA,
            teacherTip: "Condução fluida e viradas sincronizadas.",
          },
        ],
      },
    ],
  },
  {
    order: 3,
    name: "Avançado",
    worldName: "Mundo 3 - Técnica & Polirritmia",
    color: LevelColor.RED,
    globalGoal: "Moeller technique, dinâmicas extremas, métricas ímpares e linear drumming.",
    modules: [
      {
        name: "Rudimentos & Técnica Avançada",
        category: ModuleCategory.RUDIMENTOS_TECNICA,
        exercises: [
          {
            name: "Moeller Technique",
            type: ExerciseType.TECNICA,
            teacherTip: "Whip stroke, tap stroke e up stroke aplicados em velocidades altas.",
          },
          {
            name: "Swiss Army Triplet & Ratamacue",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Aplicação técnica no prato e caixa.",
          },
          {
            name: "Bumbo Duplo (ou velocidade extrema de pé único)",
            type: ExerciseType.TECNICA,
            teacherTip: "Controle de colcheias/semicolcheias constantes a 140+ BPM.",
            targetBpm: 140,
          },
        ],
      },
      {
        name: "Grooves & Independência",
        category: ModuleCategory.GROOVES_RITMOS,
        exercises: [
          {
            name: "Linear Drumming",
            type: ExerciseType.GROOVE,
            teacherTip:
              "Padrões onde nenhum elemento toca junto com o outro (estilo David Garibaldi / Tower of Power).",
          },
          {
            name: "Métricas Ímpares (Odd Meters)",
            type: ExerciseType.GROOVE,
            teacherTip: "Grooves em 5/4 e 7/8 mantendo a condução firme.",
          },
          {
            name: "Latin & Afro-Cuban",
            type: ExerciseType.GROOVE,
            teacherTip: "Songo e Mozambique aplicados ao kit.",
          },
          {
            name: "Jazz Swing",
            type: ExerciseType.GROOVE,
            teacherTip:
              "Condução de prato spang-a-lang, chimbal no 2 e 4 com os pés e comping suave na caixa/bumbo.",
          },
        ],
      },
      {
        name: "Leitura & Teoria",
        category: ModuleCategory.LEITURA_TEORIA,
        exercises: [
          {
            name: "Leitura de fusa, tercinas de semínima e quiálteras complexas",
            type: ExerciseType.LEITURA,
            teacherTip: "Trabalhar subdivisões complexas com metrônomo.",
          },
          {
            name: "Sight Reading de arranjos de Big Band/Chart",
            type: ExerciseType.LEITURA,
            teacherTip: "Leitura de partitura à primeira vista.",
          },
        ],
      },
      {
        name: "Viradas (Fills)",
        category: ModuleCategory.VIRADAS_FILLS,
        exercises: [
          {
            name: "Viradas lineares intercalando mão e pé (RLFF / KKRL)",
            type: ExerciseType.VIRADA,
            teacherTip: "2 toques na mão e 2 no pé, sem sobreposição.",
          },
          {
            name: "Viradas com deslocamento métrico (Metric Displacement)",
            type: ExerciseType.VIRADA,
            teacherTip: "Deslocar o acento mantendo a referência do tempo 1.",
          },
        ],
      },
      {
        name: "Repertório",
        category: ModuleCategory.REPERTORIO,
        exercises: [
          {
            name: "Tom Sawyer",
            artist: "Rush",
            type: ExerciseType.MUSICA,
            teacherTip: "Métricas ímpares e viradas marcantes.",
          },
          {
            name: "Rosanna",
            artist: "Toto",
            type: ExerciseType.MUSICA,
            teacherTip: "Half-time shuffle de Jeff Porcaro com ghost notes.",
          },
          {
            name: "Hysteria",
            artist: "Muse",
            type: ExerciseType.MUSICA,
            teacherTip: "Velocidade, precisão e resistência.",
          },
        ],
      },
    ],
  },
  {
    order: 4,
    name: "GoodDrummer",
    worldName: "Mundo Final - O Mestre dos Pratos",
    color: LevelColor.GOLD,
    globalGoal:
      "Domínio de Gospel Chops, improvisação avançada, afinação profissional e performance em estúdio.",
    modules: [
      {
        name: "Virtuosidade & Chops",
        category: ModuleCategory.VIRTUOSIDADE_CHOPS,
        exercises: [
          {
            name: "Gospel Chops Lineares",
            type: ExerciseType.TECNICA,
            teacherTip: "RLLFF, KRLFF, combinações em sextinas a 130+ BPM.",
            targetBpm: 130,
          },
          {
            name: "Polirritmia Avançada",
            type: ExerciseType.TECNICA,
            teacherTip: "3 contra 4, 5 contra 4 e conversão de tempo no clique.",
          },
          {
            name: "Metric Modulation",
            type: ExerciseType.TECNICA,
            teacherTip: "Mudança visual de tempo sem alterar o BPM base do metrônomo.",
          },
        ],
      },
      {
        name: "Autonomia & Estúdio",
        category: ModuleCategory.AUTONOMIA_ESTUDIO,
        exercises: [
          {
            name: "Gravação com Clique de Deslocamento",
            type: ExerciseType.TECNICA,
            teacherTip: "Tocar com o clique caindo no off-beat ou no tempo 2/4.",
          },
          {
            name: "Criação de Arranjo Próprio",
            type: ExerciseType.TECNICA,
            teacherTip: "Criar a linha completa de bateria para uma música inédita do zero.",
          },
          {
            name: "Afinação & Timbre",
            type: ExerciseType.TECNICA,
            teacherTip:
              "Afinação por intervalos, controle de harmônicos e escolha de peles para diferentes estilos.",
          },
        ],
      },
      {
        name: "Repertório Lendário",
        category: ModuleCategory.REPERTORIO,
        exercises: [
          {
            name: 'Desafio Final 1: "Bleed" (Meshuggah) ou "Dance of Eternity" (Dream Theater)',
            type: ExerciseType.MUSICA,
            teacherTip: "Precisão técnica extrema.",
          },
          {
            name: "Desafio Final 2: Solo Autoral de 2 minutos",
            type: ExerciseType.MUSICA,
            teacherTip: "Solo autoral gravado e avaliado pelo professor.",
          },
        ],
      },
    ],
  },
];

async function main() {
  // Reseeding the curriculum replaces modules/exercises (and cascades to any
  // progress recorded against them) so the content always matches this file.
  await prisma.module.deleteMany();

  for (const level of curriculum) {
    const createdLevel = await prisma.level.upsert({
      where: { order: level.order },
      update: {
        name: level.name,
        worldName: level.worldName,
        color: level.color,
        globalGoal: level.globalGoal,
      },
      create: {
        order: level.order,
        name: level.name,
        worldName: level.worldName,
        color: level.color,
        globalGoal: level.globalGoal,
      },
    });

    for (let mIndex = 0; mIndex < level.modules.length; mIndex++) {
      const moduleSeed = level.modules[mIndex];
      const createdModule = await prisma.module.create({
        data: {
          levelId: createdLevel.id,
          name: moduleSeed.name,
          category: moduleSeed.category,
          order: mIndex,
        },
      });

      for (let eIndex = 0; eIndex < moduleSeed.exercises.length; eIndex++) {
        const exerciseSeed = moduleSeed.exercises[eIndex];
        await prisma.exercise.create({
          data: {
            moduleId: createdModule.id,
            name: exerciseSeed.name,
            type: exerciseSeed.type,
            teacherTip: exerciseSeed.teacherTip,
            detail: exerciseSeed.detail,
            targetBpm: exerciseSeed.targetBpm,
            artist: exerciseSeed.artist,
            order: eIndex,
          },
        });
      }
    }
  }

  console.log("Currículo semeado com sucesso.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
