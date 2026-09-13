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
            detail:
              "Toques alternados R-L-R-L continuamente, uma baquetada por mão a cada nota. É a base de todos os outros rudimentos — o objetivo é manter volume e tempo idênticos entre as duas mãos.",
            targetBpm: 80,
          },
          {
            name: "Single Stroke Four (RLRR / LRLL)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Agrupamento do toque simples em 4 notas, trabalhando acentuação a cada 4ª nota.",
            detail:
              "Agrupamento de 4 toques simples alternados (RLRR ou LRLL) repetido em loop, deslocando a mão líder a cada grupo para treinar a troca de liderança entre as mãos.",
            targetBpm: 80,
          },
          {
            name: "Double Stroke Roll (Toque Duplo)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Controle de rebote com pulso.",
            detail:
              "Cada mão toca duas vezes seguidas (RRLLRRLL...), usando um rebote controlado pelo pulso na segunda batida de cada par, sempre com o mesmo volume nas duas notas.",
            targetBpm: 60,
          },
          {
            name: "Multiple Bounce Roll (Buzz Roll)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Pressão controlada para múltiplos rebotes por baquetada, base do roll sustentado.",
            detail:
              "A pressão da baqueta contra a pele é levemente aumentada para gerar vários rebotes por baquetada (não só dois), criando um som contínuo e 'zunido', típico de rufos sustentados.",
            targetBpm: 50,
          },
          {
            name: "Single Paradiddle (RLRR LRLL)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Acentuação na primeira nota.",
            detail:
              "Combina dois toques simples com um toque duplo: RLRR seguido de LRLL. É o rudimento mais usado para conectar toques simples e duplos e desenvolver coordenação entre as mãos.",
            targetBpm: 70,
          },
          {
            name: "Postura & Grip",
            type: ExerciseType.TECNICA,
            teacherTip:
              "Pegada Match Grip correta, ponto de pivô das baquetas e altura de banco.",
            detail:
              "Aluno sentado com o quadril levemente acima dos joelhos, baquetas seguradas em Match Grip (pegada simétrica) com o fulcro — ponto de pivô — entre o polegar e o indicador.",
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
            detail:
              "Chimbal fechado marcando todas as colcheias, bumbo nos tempos 1 e 3, caixa nos tempos 2 e 4 — o groove mais básico de pop/rock.",
          },
          {
            name: "Pop/Rock Padrão 2",
            type: ExerciseType.GROOVE,
            teacherTip: "Bumbo sincopado (1 e 3 e).",
            detail:
              "Mesma base do Padrão 1, mas com o bumbo tocando também no 'e' dos tempos 1 e 3 (contratempo), dando mais movimento ao groove.",
          },
          {
            name: "Abertura de Chimbal",
            type: ExerciseType.GROOVE,
            teacherTip: "Condução simples marcando o off-beat com abertura no 'e'.",
            detail:
              "Sobre o groove básico, o chimbal é aberto (os pratos se separam) em uma colcheia específica, geralmente no 'e' do 2 e do 4, criando o clássico 'chick' de rock.",
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
            detail:
              "Leitura à primeira vista de semínimas, colcheias e suas pausas em compasso 4/4, contando em voz alta enquanto toca no instrumento ou na perna.",
          },
          {
            name: "Mapeamento de peças do kit na partitura",
            type: ExerciseType.LEITURA,
            teacherTip: "Bumbo, Caixa, Prato de Condução, Chimbal e Tons.",
            detail:
              "Associar cada linha/espaço da pauta de bateria ao instrumento correspondente: bumbo (linha de baixo), caixa, prato de condução (linha de cima), chimbal e tons (surdo, tom 1, tom 2).",
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
            detail:
              "Virada de um único tempo tocada inteiramente na caixa em semicolcheias, geralmente encerrando com uma nota no prato de ataque e bumbo no tempo 1 seguinte.",
          },
          {
            name: "Viradas descendentes pela bateria",
            type: ExerciseType.VIRADA,
            teacherTip:
              "Caixa -> Tom 1 -> Tom 2 -> Surdo, finalizando no prato de ataque no tempo 1.",
            detail:
              "Sequência de toques que desce pelo kit: caixa, tom 1, tom 2 e surdo, terminando com uma cheia no prato de ataque junto ao bumbo no tempo 1 seguinte.",
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
            detail:
              "Groove simples em 4/4 com chimbal fechado em colcheias, bumbo e caixa marcando o tempo com poucas variações — ideal para treinar consistência em tempo lento.",
          },
          {
            name: "Another One Bites the Dust",
            artist: "Queen",
            type: ExerciseType.MUSICA,
            teacherTip: "Precisão de bumbo/caixa.",
            detail:
              "Groove disco/funk com bumbo tocando junto ao baixo em colcheias constantes e caixa firme no 2 e 4 — exige precisão no encaixe entre bumbo e caixa.",
          },
          {
            name: "Back in Black",
            artist: "AC/DC",
            type: ExerciseType.MUSICA,
            teacherTip: "Controle de tempo e acentuação.",
            detail:
              "Groove clássico de hard rock em tempo médio: chimbal em colcheias, bumbo e caixa retos no 2 e 4, com atenção especial ao 'feel' e à acentuação do chimbal.",
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
            detail:
              "Flam: as duas baquetas atingem a pele quase juntas, uma como nota de apoio baixa (grace note) e outra como nota principal acentuada, criando um som 'gordo'. Drag: duas notas de apoio rápidas antes da nota principal.",
          },
          {
            name: "Paradiddle-Diddle (RLRRLL)",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Execução fluida em acentuação ternária/sextinas.",
            detail:
              "Rudimento de 6 notas: um toque simples duplo (RL) seguido de dois toques duplos (RR LL), muito usado em subdivisões ternárias e sextinas ao redor do kit.",
          },
          {
            name: "Five-Stroke Roll & Seven-Stroke Roll",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Aplicação em entradas de compasso.",
            detail:
              "Rolls fechados com número ímpar de toques (RRLLR ou RRLLRRL), terminando sempre com uma nota acentuada isolada — usados como entradas rítmicas antes de um tempo forte.",
          },
          {
            name: "Técnica de Pés",
            type: ExerciseType.TECNICA,
            teacherTip:
              "Calcanhar levantado (Heel-up) e técnica de slide para toques duplos no bumbo.",
            detail:
              "Heel-up: calcanhar levantado, usando o tornozelo e a perna para gerar força e velocidade no bumbo. Slide: o pé desliza sobre o pedal para produzir dois toques rápidos com um único movimento.",
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
            detail:
              "Caixa acentuada nos tempos 2 e 4, com notas fantasma (ghost notes) tocadas bem baixinho nas semicolcheias 'mi-e-a' entre os acentos, criando o groove e o balanço característicos do funk.",
          },
          {
            name: "Disco/Dance Groove",
            type: ExerciseType.GROOVE,
            teacherTip:
              "Chimbal aberto em todas as colcheias off-beat com bumbo em 4 na linha.",
            detail:
              "Chimbal aberto em todas as colcheias do contratempo (offbeat), bumbo tocando nos 4 tempos ('four on the floor') e caixa reforçando o 2 e 4.",
          },
          {
            name: "Bossa Nova & Samba Básico",
            type: ExerciseType.GROOVE,
            teacherTip: "Condução no aro (Cross-stick) com padrão de bumbo sincopado.",
            detail:
              "Condução tocada no aro da caixa (cross-stick / rimshot lateral) seguindo o padrão rítmico brasileiro, com bumbo sincopado imitando o surdo da bateria de samba.",
          },
          {
            name: "Shuffle/Blues",
            type: ExerciseType.GROOVE,
            teacherTip: "Condução em tercinas de colcheia (Triplets) com caixa no 2 e 4.",
            detail:
              "Condução em tercinas de colcheia no chimbal ou prato (ta-ta-ta), com caixa firme no 2 e 4, criando o balanço arrastado típico do blues/shuffle.",
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
            detail:
              "Leitura de padrões com semicolcheias: galope (semicolcheia-semicolcheia-colcheia) e seu inverso (colcheia-semicolcheia-semicolcheia), além de colcheia com duas semicolcheias.",
          },
          {
            name: "Fórmula de compasso 3/4 e 6/8",
            type: ExerciseType.LEITURA,
            teacherTip: "Sentir e contar as novas fórmulas de compasso com naturalidade.",
            detail:
              "3/4: três tempos de semínima por compasso (sensação de valsa). 6/8: seis colcheias agrupadas em dois grupos de três, com sensação de balanço ternário.",
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
            detail:
              "Viradas que combinam flams na caixa/tons com toques de bumbo intercalados entre as mãos, mantendo o pulso constante mesmo com a textura mais densa.",
          },
          {
            name: "Viradas com subdivisão de tercinas pela bateria",
            type: ExerciseType.VIRADA,
            teacherTip: "Distribuir tercinas por todo o kit com fluidez.",
            detail:
              "Viradas tocadas em tercinas (3 notas por tempo) distribuídas entre caixa, tons e surdo, treinando a sensação ternária sobre uma base binária.",
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
            detail:
              "Groove funk com forte independência entre bumbo sincopado e caixa/chimbal, exigindo controle rítmico preciso e bom senso de groove.",
          },
          {
            name: "Come Together",
            artist: "The Beatles",
            type: ExerciseType.MUSICA,
            teacherTip: "Uso de tons e dinâmica.",
            detail:
              "Groove com uso expressivo dos tons e dinâmica, incluindo o riff de bateria característico com tom grave e caixa esparsa.",
          },
          {
            name: "Californication",
            artist: "Red Hot Chili Peppers",
            type: ExerciseType.MUSICA,
            teacherTip: "Condução fluida e viradas sincronizadas.",
            detail:
              "Condução fluida no chimbal com viradas curtas e sincronizadas ao riff da música, exigindo transições suaves entre groove e fill.",
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
            detail:
              "Técnica de movimento em 'chicote' (whip stroke) que usa o relaxamento do pulso e antebraço para gerar uma sequência de toques (forte-fraco-fraco) com o mínimo de esforço — essencial para tocar rápido por longos períodos.",
          },
          {
            name: "Swiss Army Triplet & Ratamacue",
            type: ExerciseType.RUDIMENTO,
            teacherTip: "Aplicação técnica no prato e caixa.",
            detail:
              "Swiss Army Triplet: um flam seguido de dois toques simples, formando uma tercina acentuada. Ratamacue: um drag (duas notas de apoio) seguido de três toques simples, aplicado entre caixa e prato/tons.",
          },
          {
            name: "Bumbo Duplo (ou velocidade extrema de pé único)",
            type: ExerciseType.TECNICA,
            teacherTip: "Controle de colcheias/semicolcheias constantes a 140+ BPM.",
            detail:
              "Uso de pedal duplo (dois pedais em um único bumbo) ou técnica de pé único em altíssima velocidade para tocar colcheias/semicolcheias constantes acima de 140 BPM.",
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
            detail:
              "Estilo onde nenhum instrumento toca ao mesmo tempo que outro — bumbo, caixa e chimbal se revezam nota a nota, criando uma textura rítmica 'costurada', típica de David Garibaldi e Tower of Power.",
          },
          {
            name: "Métricas Ímpares (Odd Meters)",
            type: ExerciseType.GROOVE,
            teacherTip: "Grooves em 5/4 e 7/8 mantendo a condução firme.",
            detail:
              "Grooves construídos em compassos como 5/4 (5 tempos) ou 7/8 (7 colcheias), exigindo contagem interna firme para não perder a referência do tempo 1.",
          },
          {
            name: "Latin & Afro-Cuban",
            type: ExerciseType.GROOVE,
            teacherTip: "Songo e Mozambique aplicados ao kit.",
            detail:
              "Songo: mistura de padrões afro-cubanos com a bateria, combinando chimbal, caixa e bumbo sincopado. Mozambique: padrão de percussão cubana adaptado ao kit com forte ênfase nos tons e bumbo.",
          },
          {
            name: "Jazz Swing",
            type: ExerciseType.GROOVE,
            teacherTip:
              "Condução de prato spang-a-lang, chimbal no 2 e 4 com os pés e comping suave na caixa/bumbo.",
            detail:
              "Condução no prato com o padrão 'spang-a-lang' (colcheia-tercina swingada), chimbal fechado pelo pé no 2 e 4, e comping (acentos conversacionais) suave e sincopado na caixa e bumbo.",
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
            detail:
              "Leitura de subdivisões rápidas (fusas), tercinas sobre a semínima (3 notas em 2 tempos) e quiálteras irregulares, sempre apoiado por metrônomo para manter a precisão.",
          },
          {
            name: "Sight Reading de arranjos de Big Band/Chart",
            type: ExerciseType.LEITURA,
            teacherTip: "Leitura de partitura à primeira vista.",
            detail:
              "Leitura à primeira vista de partituras completas de big band ('charts'), incluindo kicks (acentos em conjunto com a banda), dinâmica e marcações de forma (intro, solo, shout chorus).",
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
            detail:
              "Padrões lineares que intercalam mãos e pés sem sobreposição — por exemplo, 2 toques de mão seguidos de 2 toques de bumbo (RLFF) — criando fills tecnicamente exigentes.",
          },
          {
            name: "Viradas com deslocamento métrico (Metric Displacement)",
            type: ExerciseType.VIRADA,
            teacherTip: "Deslocar o acento mantendo a referência do tempo 1.",
            detail:
              "O acento de um padrão é deslocado para um ponto diferente do tempo, mas mantendo sempre a referência auditiva do tempo 1 — um recurso avançado de composição rítmica.",
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
            detail:
              "Métricas ímpares e viradas marcantes de Neil Peart, com trocas de compasso ao longo da música.",
          },
          {
            name: "Rosanna",
            artist: "Toto",
            type: ExerciseType.MUSICA,
            teacherTip: "Half-time shuffle de Jeff Porcaro com ghost notes.",
            detail:
              "Half-time shuffle de Jeff Porcaro: combina o feel de shuffle em tercinas com ghost notes densas na caixa, sobre uma sensação de tempo pela metade.",
          },
          {
            name: "Hysteria",
            artist: "Muse",
            type: ExerciseType.MUSICA,
            teacherTip: "Velocidade, precisão e resistência.",
            detail:
              "Exige velocidade, precisão e resistência, com padrões de bumbo rápidos e constantes durante toda a música.",
          },
        ],
      },
    ],
  },
  {
    order: 4,
    name: "GodDrummer",
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
            detail:
              "Combinações lineares rápidas entre mãos e pés (RLLFF, KRLFF) tocadas em sextinas a mais de 130 BPM, característica do estilo 'gospel chops' popularizado por bateristas de igreja.",
            targetBpm: 130,
          },
          {
            name: "Polirritmia Avançada",
            type: ExerciseType.TECNICA,
            teacherTip: "3 contra 4, 5 contra 4 e conversão de tempo no clique.",
            detail:
              "Sobreposição de subdivisões diferentes tocadas simultaneamente (3 contra 4, 5 contra 4), treinando a conversão mental de um tempo para outro sem perder a referência do clique.",
          },
          {
            name: "Metric Modulation",
            type: ExerciseType.TECNICA,
            teacherTip: "Mudança visual de tempo sem alterar o BPM base do metrônomo.",
            detail:
              "Mudança da sensação/visualização do tempo (por exemplo, de binário para ternário) sem alterar o BPM real do metrônomo — o pulso interno muda, mas o clique permanece o mesmo.",
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
            detail:
              "Tocar com o clique do metrônomo posicionado fora do tempo 1 (no contratempo ou no 2/4), forçando o baterista a manter a própria referência interna de tempo.",
          },
          {
            name: "Criação de Arranjo Próprio",
            type: ExerciseType.TECNICA,
            teacherTip: "Criar a linha completa de bateria para uma música inédita do zero.",
            detail:
              "O aluno compõe do zero a linha completa de bateria para uma música inédita, definindo groove, viradas e dinâmica de forma autoral.",
          },
          {
            name: "Afinação & Timbre",
            type: ExerciseType.TECNICA,
            teacherTip:
              "Afinação por intervalos, controle de harmônicos e escolha de peles para diferentes estilos.",
            detail:
              "Ajuste da tensão das peles por intervalos musicais, controle de overtones (harmônicos indesejados) e escolha de peles adequadas ao estilo musical desejado.",
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
            detail:
              "Exige precisão técnica extrema em altíssima velocidade, com trocas de métrica constantes e padrões lineares complexos.",
          },
          {
            name: "Desafio Final 2: Solo Autoral de 2 minutos",
            type: ExerciseType.MUSICA,
            teacherTip: "Solo autoral gravado e avaliado pelo professor.",
            detail:
              "Solo de bateria autoral, gravado e avaliado pelo professor, demonstrando domínio técnico, musicalidade e criatividade.",
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
