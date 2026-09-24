import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const workspaceRoot = path.resolve(projectRoot, "..");
const descriptors = JSON.parse(
  await fs.readFile(path.join(workspaceRoot, "tmp/descriptor_data.json"), "utf8"),
);
const teachingIdeas = JSON.parse(
  await fs.readFile(path.join(workspaceRoot, "tmp/teaching_ideas.json"), "utf8"),
);

const areaMeta = {
  "Expressive Arts": { short: "Expressive Arts", color: "#7C3AED", icon: "Palette" },
  "Health and Well-being": { short: "Health & Well-being", color: "#C2416C", icon: "HeartPulse" },
  Humanities: { short: "Humanities", color: "#B45309", icon: "Landmark" },
  "Languages, Literacy and Communication": { short: "Languages & Literacy", color: "#0F766E", icon: "Languages" },
  "Mathematics and Numeracy": { short: "Maths & Numeracy", color: "#B91C1C", icon: "Sigma" },
  "Science and Technology": { short: "Science & Technology", color: "#0369A1", icon: "Atom" },
};

function parseIdeaCell(value) {
  return value.split("\n\n").map((block) => {
    const lines = block.split("\n");
    const resourceLine = lines[0];
    const titleLine = lines[1] || "";
    const [resourceType, ...resourceParts] = resourceLine.split(":");
    return {
      mode: resourceType === "DEVICE" ? "Technology" : "Barefoot",
      resources: resourceParts.join(":").trim(),
      title: titleLine.replace(/^IDEA \d+: /, "").trim(),
      description: lines.slice(2).join(" ").trim(),
    };
  });
}

const records = [];
const areas = [];

for (let areaIndex = 0; areaIndex < descriptors.length; areaIndex += 1) {
  const area = descriptors[areaIndex];
  const meta = areaMeta[area.area];
  areas.push({
    name: area.area,
    short: meta.short,
    color: meta.color,
    icon: meta.icon,
    statements: area.statements.map((statement) => ({
      order: statement.statementOrder,
      text: statement.statement,
    })),
  });

  for (let statementIndex = 0; statementIndex < area.statements.length; statementIndex += 1) {
    const statement = area.statements[statementIndex];
    const ideaStatement = teachingIdeas[areaIndex].statements[statementIndex];
    for (const step of [2, 3]) {
      const stepKey = String(step);
      for (let index = 0; index < statement.steps[stepKey].length; index += 1) {
        records.push({
          id: `${areaIndex + 1}-${statement.statementOrder}-${step}-${index + 1}`,
          area: area.area,
          areaShort: meta.short,
          color: meta.color,
          statementOrder: statement.statementOrder,
          statement: statement.statement,
          step,
          descriptorOrder: index + 1,
          descriptor: statement.steps[stepKey][index],
          ideas: parseIdeaCell(ideaStatement.steps[stepKey][index]),
        });
      }
    }
  }
}

const payload = {
  areas,
  records,
  totals: {
    descriptors: records.length,
    ideas: records.reduce((total, record) => total + record.ideas.length, 0),
  },
};

await fs.writeFile(
  path.join(projectRoot, "app/curriculum-data.json"),
  `${JSON.stringify(payload, null, 2)}\n`,
);

console.log(JSON.stringify(payload.totals));
