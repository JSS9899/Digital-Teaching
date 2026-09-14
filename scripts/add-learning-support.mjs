import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(scriptDir, "../app/curriculum-data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const scenarios = {
  "adapting communication for purpose and audience": [
    "how to describe a favourite object to a friend and then to the class",
    "how a recycling message could be changed for younger pupils and parents",
    "how the same campaign could be presented in an assembly and on social media",
  ],
  "attention, thoughts and self-awareness": [
    "what helps pupils concentrate during a five-minute drawing task",
    "how noise, movement and short breaks affect concentration during independent work",
    "how different focus strategies affect performance before an assessment or presentation",
  ],
  "balanced food choices and nutrition": [
    "how to build a balanced lunchbox from picture cards",
    "how to compare two lunches and suggest one realistic improvement",
    "how cost, culture and nutritional information can influence a weekly meal plan",
  ],
  "chronology, change, cause and consequence": [
    "the order of events in a familiar day or traditional tale",
    "the causes and results of an important event in local history",
    "how several causes contributed to an event such as the Industrial Revolution",
  ],
  "clear speaking and purposeful discussion": [
    "how to explain the rules of a playground game clearly",
    "how to present a short opinion about improving the school",
    "how to lead a balanced discussion about a local issue",
  ],
  "collecting, representing and interpreting data": [
    "which playground activity is most popular in the class",
    "how pupils travel to school and the clearest way to display the results",
    "whether a dataset about screen time supports a headline written about it",
  ],
  "communicating an idea through creative work": [
    "how colours and shapes can show a favourite memory",
    "how a short animation can communicate the idea of belonging",
    "how a performance or digital artwork can communicate a social message",
  ],
  "computational thinking, data and connected systems": [
    "how clear instructions can guide a character through a simple maze",
    "how a class-library system could sort, store and find books",
    "how an app could collect useful data while protecting the user's privacy",
  ],
  "confident, safe movement and physical progress": [
    "how to move safely through a simple balance course",
    "how changing speed or direction affects control during a movement sequence",
    "how video feedback can help improve technique in a chosen physical activity",
  ],
  "connections between languages, identity and culture": [
    "how the class says a welcome phrase in Welsh, English and another familiar language",
    "how place names and everyday words can reveal links between languages and communities",
    "how language choices can express identity in music, advertising or social media",
  ],
  "considered decisions and their consequences": [
    "what might happen after different choices in a familiar playground situation",
    "how several choices could affect a pupil planning a healthy weekly routine",
    "how short-term and long-term results might shape an important fictional decision",
  ],
  "constructive artistic feedback and comparison": [
    "how kind feedback could improve a class collage",
    "how two different versions of a short animation could be compared and improved",
    "how audience feedback could strengthen a performance, design or digital artwork",
  ],
  "counting, quantity and comparing number": [
    "how many objects are needed for each table at snack time",
    "which of several collections has the greatest value and how pupils know",
    "how different ways of grouping a large quantity make it easier to compare",
  ],
  "creative problem-solving and resilience": [
    "what to try when a model made from blocks keeps falling down",
    "how to improve a design when the first version does not work as planned",
    "how an artist or designer can respond when materials, time or technology create a problem",
  ],
  "designing, prototyping and improving a solution": [
    "how to make a simple container that keeps a small object safe",
    "how to design and test a useful organiser for a classroom user",
    "how to prototype a product that meets a user's needs and environmental limits",
  ],
  "developing and refining a creative design": [
    "how to choose colours and shapes for a celebration card",
    "how feedback could improve a planned character, product or performance",
    "how research, testing and feedback could shape a final creative design",
  ],
  "efficient calculation and number relationships": [
    "different ways to make the same total using counters or coins",
    "how arrays and known facts can make multiplication calculations quicker",
    "how choosing an efficient strategy can simplify a multi-step calculation",
  ],
  "empathy and kindness": [
    "how a story character might feel when they are left out of a game",
    "how words and actions could support someone facing a difficult day",
    "how different experiences can shape people's needs and points of view",
  ],
  "estimating, measuring and using appropriate units": [
    "which classroom object is longer before checking with cubes or a ruler",
    "which units and tools are best for measuring items around the school",
    "how measurement accuracy could affect a practical design or investigation",
  ],
  "finding, checking and explaining meaning": [
    "what a character may be feeling from clues in a picture book",
    "how details in a text support an idea that is not directly stated",
    "how several clues from a text can support or challenge an interpretation",
  ],
  "forces, energy, light, sound and electricity": [
    "how pushing a toy car with different strengths changes its movement",
    "how the distance from a light source changes the size of a shadow",
    "how changing one part of an electrical circuit affects its output",
  ],
  "fractions, decimals, percentages and proportional reasoning": [
    "how to share two pizzas fairly between different numbers of pupils",
    "how fractions, decimals and percentages can show the same part of a whole",
    "how changing a recipe from four people to six changes every quantity",
  ],
  "healthy, respectful relationships": [
    "how friends can take turns and respond kindly when they disagree",
    "how a character could communicate a boundary clearly and respectfully",
    "how consent, trust and responsibility support a healthy relationship",
  ],
  "how creative choices communicate mood and feeling": [
    "how warm and cool colours can make the same picture feel different",
    "how music, movement or camera angle can change the mood of a short scene",
    "how several artistic choices can shape an audience's emotional response",
  ],
  "identity and diversity in communities": [
    "the different groups, traditions and interests represented in the class",
    "how people's experiences of the same community can be different",
    "how identity, culture and context shape different views of a community issue",
  ],
  "links between physical and emotional changes": [
    "how the body may feel before and after energetic movement",
    "how physical changes can affect feelings during a new experience",
    "how sleep, stress and physical activity can influence emotional well-being",
  ],
  "listening closely and interpreting spoken meaning": [
    "how to follow a short set of instructions for making a simple model",
    "how tone and emphasis can change the meaning of the same spoken sentence",
    "how speakers use language, pauses and tone to influence an audience",
  ],
  "living things, adaptation and interdependence": [
    "what a garden minibeast needs to survive",
    "how plants and animals depend on one another in a pond habitat",
    "how one environmental change could affect several organisms in a food web",
  ],
  "material properties and changes": [
    "which material would keep a teddy dry in the rain",
    "how heating, cooling or mixing can change familiar materials",
    "how material properties affect the design and environmental impact of a product",
  ],
  "measuring and calculating with time": [
    "how long familiar classroom activities take",
    "how to plan a timetable using durations and start and finish times",
    "how delays and changing durations affect a multi-stage schedule",
  ],
  "money, transactions and financial reasoning": [
    "how to choose coins to pay for an item in a class shop",
    "how to compare prices and calculate change within a simple budget",
    "how interest, discounts or changing costs affect a longer-term financial choice",
  ],
  "patterns, equality and algebraic rules": [
    "how a repeating pattern grows using shapes or counters",
    "how a rule connects the position of a term to its value",
    "how algebra can describe and test a pattern that continues indefinitely",
  ],
  "people, resources and the natural world": [
    "how people use and care for water in school",
    "how one local activity affects people, resources and wildlife",
    "how different choices about energy or land use create benefits and challenges",
  ],
  "place value, number magnitude and rounding": [
    "where different two-digit numbers belong on a number line",
    "how changing one digit changes a number's value",
    "when an estimated value is more useful than an exact answer",
  ],
  "place, landscape and spatial patterns": [
    "the important features found on a simple map of the school",
    "why homes, roads or services are arranged differently in two places",
    "how mapped evidence could explain a pattern such as population or land use",
  ],
  "planning and carrying out an enquiry": [
    "which materials keep an ice cube cold for the longest time",
    "how to investigate a focused question about the local area",
    "how changing an enquiry method could make its evidence more reliable",
  ],
  "planning, composing and improving writing": [
    "how to plan and improve a short description of an imaginary place",
    "how structure and vocabulary can make an explanation clearer",
    "how drafting and feedback can shape writing for a specific audience",
  ],
  "presenting creative work for an audience": [
    "how to prepare and share a short class performance",
    "how presentation choices can help an audience understand a creative piece",
    "how a venue, platform and audience could shape the presentation of creative work",
  ],
  "reading strategies and understanding written language": [
    "how pictures, sounds and familiar words help make sense of a short text",
    "how headings, key words and context help readers find and understand information",
    "how readers combine several strategies to understand and question a challenging text",
  ],
  "recognising and managing feelings": [
    "how a character could recognise and respond to feeling worried",
    "which strategies could help someone manage anger or disappointment",
    "how emotional clues and coping strategies can be evaluated in a complex situation",
  ],
  "recognising risk and getting appropriate help": [
    "how to spot an unsafe situation and name a trusted adult who could help",
    "how to judge the level of risk in several familiar scenarios",
    "how to assess an unfamiliar risk and choose an appropriate source of support",
  ],
  "recording findings and drawing conclusions": [
    "how to record what happens when seeds receive different amounts of water",
    "how a results table can help answer a scientific question",
    "how to decide whether collected evidence supports a proposed conclusion",
  ],
  "responding creatively to literature": [
    "how to create a new ending for a familiar story",
    "how a studied writing technique could be used in an original scene or poem",
    "how an original response could echo, challenge or transform ideas from a studied text",
  ],
  "responsible science and environmental impact": [
    "how everyday choices can reduce waste in the classroom",
    "how evidence could help the school choose an environmentally responsible action",
    "how scientific benefits, risks and environmental effects could be weighed in a real decision",
  ],
  "rights, fairness and ethical action": [
    "what would make sharing limited playground equipment fair",
    "how rights and responsibilities could guide a decision in school or the community",
    "how different ethical viewpoints could shape a response to a social issue",
  ],
  "safe and purposeful use of creative tools": [
    "how to collect, use and tidy painting or modelling tools safely",
    "how to choose and use physical or digital creative tools for a clear purpose",
    "how safe, responsible tool choices support an independent creative project",
  ],
  "scientific questions, evidence and conclusions": [
    "which surface allows a toy car to travel furthest",
    "how to turn an observation into a fair test with useful evidence",
    "whether the evidence from an investigation truly supports its conclusion",
  ],
  "selecting and controlling creative techniques and materials": [
    "which tools and materials create different marks and textures",
    "how combining two techniques changes the effect of a creative piece",
    "how deliberate control of techniques and materials can achieve a chosen outcome",
  ],
  "shape, position and spatial reasoning": [
    "how shapes can be sorted and described using their features",
    "how coordinates or directions can describe a route around a grid",
    "how geometric properties can be used to solve a design or construction problem",
  ],
  "social influences, values and group expectations": [
    "how friends can influence a choice in a familiar situation",
    "how advertising and peer groups can shape attitudes and decisions",
    "how social media, culture and group expectations can influence identity and behaviour",
  ],
  "sounds, phonics and word recognition": [
    "how changing the first sound changes a familiar word",
    "how letter patterns help pupils read and spell unfamiliar words",
    "how knowledge of word parts and sound patterns supports fluent reading",
  ],
  "weighing evidence, facts and viewpoints": [
    "which clues best explain what happened in a simple mystery",
    "how two sources can present different views of the same event",
    "how the reliability and limits of evidence affect a balanced judgement",
  ],
};

const methodExamples = {
  "Gallery Walk and Improve": () => "Pupils display their first attempt around the room. Classmates leave one helpful comment, then everyone chooses one change to make.",
  "Digital Peer Review": () => "Partners share a first draft online and add one positive comment and one suggestion. Each pupil uses the most helpful feedback and briefly explains the change.",
  "Interactive Model": () => "Pupils build a simple clickable model or quiz, ask a partner to test it and fix one part that is confusing or incorrect.",
  "Explainer Presentation": () => "Groups use four slides: the question, an example, their explanation and a conclusion. Another group checks whether the message is easy to follow.",
  "Card-Sort Challenge": () => "Give groups a set of example cards to sort. They write a rule for each group and explain any card that caused disagreement.",
  "Evidence Slide Deck": () => "Pairs make three slides showing their evidence, what it means and their conclusion. They swap with another pair and use one suggestion to improve it.",
  "Source Audit": () => "Pupils highlight the main claim and the evidence that supports it in two short sources. They note anything uncertain before writing a balanced conclusion.",
  "Silent Chalk Talk": () => "Write the question in the centre of a large sheet or shared slide. Pupils silently add ideas, links and questions before discussing the strongest contributions.",
  "Three-Scene Story": () => "Pupils create a beginning, middle and ending in ScratchJr. They add short narration and replay the story to check that the learning is clear.",
  "Concept-Map Relay": () => "Teams take turns adding an idea or example to a large concept map. Every new link needs a short spoken explanation.",
  "Photo Evidence Hunt": () => "Pupils photograph three useful examples, label the important detail in each image and record a short explanation of what the evidence shows.",
  "Collaborative Source Board": () => "Each pupil adds one useful fact or example to a shared board. The group sorts the evidence and agrees on a conclusion based on what they found.",
  "Scratch Simulation": () => "Pupils build a simple Scratch model with choices or changing values. They try different inputs and discuss how the model is similar to and different from real life.",
  "Field Observation Walk": () => "During a short walk, pupils record only evidence that helps answer the question. Back in class, they compare findings and identify something their method may have missed.",
  "Drag-and-Explain Board": () => "Pairs move pictures or labels into position on a shared slide. They add a short voice note explaining one important choice.",
  "Debate Corners": () => "Label different corners with possible opinions. Pupils choose a starting position, listen to evidence from another corner and move if their view changes.",
  "Audio Field Report": () => "Pairs record a one-minute report with an introduction, two useful pieces of evidence and a conclusion. They listen back and improve the least clear part.",
  "Annotated Video Analysis": () => "Pupils pause a short video at three useful moments and label what they notice. Their final note explains which moment offers the strongest evidence.",
  "Digital Field Guide": () => "Pupils create one field-guide page using a labelled image, a short explanation and an optional voice recording. A partner checks it for clarity.",
  "Podcast Panel": () => "Give each group member a different opinion to explore and record a two-minute discussion. The group finishes by agreeing on what the evidence shows and one question they still have.",
  "Evidence Carousel": () => "Groups move around several evidence stations, recording one observation at each. They bring the evidence together and agree on the best-supported conclusion.",
  "Teach-the-Robot": () => "One pupil pretends to be a robot while a partner gives exact instructions. They stop at the first unclear step, improve it and try again.",
  "Freeze-Frame Sequence": () => "Groups create three freeze frames showing the beginning, a change and the ending. The audience identifies the clues and suggests one clearer choice.",
  "Class Data Investigation": () => "The class collects a small, non-personal dataset and chooses a suitable way to display it. Pupils write two things they notice and one question raised by the results.",
  "Multimedia Case Study": () => "Pupils combine short text, labelled images and narration into a focused case study. They name the sources provided and adapt the explanation for a chosen audience.",
  "Human Continuum": () => "Mark a line from one view to another. Pupils stand or place evidence along it, explain their position and move only if new evidence changes their mind.",
  "Branching Decision Model": (step) => `Pupils begin with one situation and add ${step === 1 ? "two" : step === 2 ? "three" : "at least three"} possible choices. Each branch shows what might happen next and the reason behind it.`,
  "Data Story": () => "Pupils choose a suitable calculation, table or chart and add a short explanation of the pattern. They also check whether the visual could give the wrong impression.",
  "Mystery Evidence Bag": () => "Reveal one clue at a time and ask groups to record what they know and what they think it might mean. Pupils update their idea when a stronger clue appears.",
  "Story-Map Mat": () => "Pupils arrange picture or word cards into a clear sequence on the floor. They remove one card to see why it matters, then repair the sequence.",
  "Role-Play Decisions": () => "Groups act out a short made-up situation and pause whenever a choice is needed. They discuss what may happen, replay the scene with a different choice and compare the results.",
  "Expert Stations": () => "Groups complete different short stations and become the class expert on one example. They then teach it to others and ask one quick checking question.",
  "Picture-and-Voice Book": () => "Pairs create two pages, each with a drawing or photograph and a short voice recording. The second page should clearly build on the first.",
  "Resource-Budget Challenge": () => "Give teams a limited number of counters to spend on their choices. Reveal a result card after each decision and allow teams to change their plan if they can explain why.",
  "Question Diamond": () => "Pupils arrange questions from most to least useful in a diamond shape. They improve the top question and decide what evidence would answer it.",
  "Digital Sort and Record": () => "Pupils sort pictures or examples on a shared slide and record a short explanation for one difficult choice. A partner checks whether the rule is clear.",
  "Paired Coaching Circuit": () => "At each short station, one pupil completes or explains the task while their partner checks one success point. They swap roles and try to improve.",
  "Mini Video Demonstration": () => "Pairs film three short clips: show the task, explain the important point and check the result. They watch it back and improve one unclear section.",
  "Stop-Motion Explanation": () => "Groups use objects or paper pieces to show each stage and photograph the changes. They turn the images into a short stop-motion explanation.",
  "Human Graph": () => "Pupils stand in positions that create a human graph or model. The class checks the scale or groups, describes a visible pattern and discusses what the model leaves out.",
  "Mapped Evidence Tour": () => "Pupils compare two or three locations on a map or aerial image and add captions to useful evidence. They finish by explaining the connection between the places.",
  "Sound Snapshot": () => "Pupils record a 30-second audio clip using their voice and safe classroom sounds. They listen back and identify the part that best shows the learning.",
  "Build-Test-Improve": () => "Pupils create a first version, test it against one clear success point and record what happens. They make one improvement and test it again.",
  "MakeCode Simulator Challenge": () => "Pupils predict what a short MakeCode program will do, run it in the simulator and fix one problem. They explain how their change improved the output.",
  "Google Earth Evidence Map": () => "Pupils compare mapped evidence from several places or dates and add labels to the strongest patterns. They use those labels to suggest an explanation.",
  "MakeCode Prototype": () => "Teams build a small program with an input, a process and an output. They test an unusual example, fix a problem and explain one design improvement.",
  "Question-and-Response Survey": () => "The class answers a short anonymous question and displays the results. Pupils compare responses and identify one way the question or sample could be improved.",
  "GeoGebra Investigation": () => "Pupils create an interactive construction, change one value at a time and save evidence of what happens. They write a rule describing what always stays true.",
  "Virtual Evidence Lab": () => "Pupils change one variable at a time in a safe simulation and record each result. They use the pattern to answer the original question and note one limit of the model.",
  "Floor Timeline": () => "Pupils arrange event or stage cards along a floor timeline. They explain the gaps between cards and discuss where a different placement could also make sense.",
};

const introBuilders = [
  (scenario) => `For example, pupils could explore ${scenario}.`,
  (scenario) => `One classroom example is to explore ${scenario}.`,
  (scenario) => `This activity could focus on ${scenario}.`,
];

const actionExpansions = {
  "turn a memory": "turn a memory, feeling or idea into a short creative response",
  "explore how colour": "explore how colour, sound, movement or framing changes a mood",
  rehearse: "rehearse, present and review how an audience responds",
  "use kind": "use kind, specific feedback to suggest one achievable improvement",
  "sequence the setup": "sequence the setup, use and tidy-up steps for creative materials",
  "adapt a movement challenge when space": "adapt a movement challenge when space, speed or direction changes",
  "practise a simple stop": "practise a simple stop, move away and tell routine",
  "observe progress in balance": "observe progress in balance, control or coordination",
  "notice how breathing": "notice how breathing, movement and feelings may change together",
  "compare how thoughts": "compare how thoughts, feelings and actions can influence one another",
  "sort made-up relationship behaviours into respectful": "sort made-up relationship behaviours into respectful, concerning and unsafe",
  "practise communicating a need": "practise communicating a need, boundary or feeling clearly",
  "collect observations": "collect observations, group them using a clear rule and state a conclusion",
  "compare two short sources and tell the difference between fact": "compare two short sources and tell the difference between fact, opinion and belief",
  "identify similarities": "identify similarities, differences and connections across groups",
  "collect examples of how languages connect people": "collect examples of how languages connect people, places and identities",
  "use visible text clues to decode": "use visible text clues to decode, check and discuss meaning",
  "combine words": "combine words, images and sound so each mode adds meaning",
  hear: "hear, sort and reproduce a small set of different speech sounds",
  "listen for important information": "listen for important information, the speaker's tone and clues that are not spoken in a short text",
  "label how vocabulary": "label how vocabulary, sentence choices or punctuation shape a text",
  predict: "predict, check and revise an explanation using evidence",
  "adapt voice": "adapt voice, vocabulary and structure for a specific purpose",
  plan: "plan, draft and improve a short text for a clear purpose",
  "respond to a literary text by extending a character": "respond to a literary text by extending a character, image or idea",
  "compare how two texts create interest": "compare how two texts create interest, mood or imagination",
  "show a multiplication pattern with objects": "show a multiplication pattern with objects, arrays or equations",
  "solve a realistic buying": "solve a realistic buying, budgeting or profit-and-loss challenge",
  build: "build, order and represent numbers using place-value evidence",
  "test a claim about fractions": "test a claim about fractions, decimals or percentages with examples",
  continue: "continue, create and explain a visual or numerical pattern",
  estimate: "estimate, measure and explain the choice of unit and instrument",
  "solve a route": "solve a route, coordinate, symmetry or rotation challenge",
  "interpret a graph": "interpret a graph, identify a pattern and support a conclusion",
  "test how scale": "test how scale, unusual results or chance affect an explanation",
  "investigate a threat": "investigate a threat, defence, prevention or treatment using reliable evidence",
  "consider function": "consider function, safety and environmental impact in a design decision",
  "model how data moves": "model how data moves, is stored or is protected in a connected system",
  "change one variable and observe its effect on motion": "change one variable and observe its effect on motion, sound, light or a circuit",
  create: "create, run and debug an algorithm for a clear outcome",
};

function extractAction(description) {
  const sentences = description.match(/[^.!?]+[.!?]+/g) ?? [description];

  for (const sentence of sentences) {
    if (/^\s*The teacher/i.test(sentence)) continue;
    const match = sentence.match(/(?:small groups|pupils|pairs|groups|teams|the class)\s+(.+?)[.!?]$/i);
    if (!match) continue;

    let action = match[1].trim();
    if (/^rotate through evidence stations as they /i.test(action)) {
      action = action.replace(/^rotate through evidence stations as they /i, "");
    }

    action = action
      .replace(/^use the camera as they /i, "")
      .replace(/^look at one clue at a time while they /i, "")
      .split(/\s+(?:by arranging a visual story|and make a 30-second audio snapshot|by changing one variable at a time|by comparing mapped evidence)/i)[0]
      .split(",")[0]
      .trim();

    if (action) return action;
  }

  throw new Error(`Could not create a learning goal from: ${description}`);
}

function createLearningGoal(description) {
  const extractedAction = extractAction(description)
    .replace(/\ban meaning\b/gi, "a meaning")
    .replace(/\btheir positions\b/gi, "their choices");
  const action = actionExpansions[extractedAction] ?? extractedAction;
  return `Pupils will learn to ${action}.`;
}

function createExample(method, focus, step, seed) {
  const scenarioSet = scenarios[focus];
  const buildMethod = methodExamples[method];
  if (!scenarioSet) throw new Error(`Missing example scenario for focus: ${focus}`);
  if (!buildMethod) throw new Error(`Missing example format for method: ${method}`);

  const introduction = introBuilders[seed % introBuilders.length](scenarioSet[step - 1]);
  return `${introduction} ${buildMethod(step)}`;
}

let updated = 0;
let ideaIndex = 0;

for (const record of data.records) {
  for (const idea of record.ideas) {
    const [method, ...focusParts] = idea.title.split(" - ");
    const focus = focusParts.join(" - ");
    idea.learningGoal = createLearningGoal(idea.description);
    idea.example = createExample(method, focus, record.step, ideaIndex + record.descriptorOrder);
    idea.description = idea.description.replace(/\ban meaning\b/gi, "a meaning");
    updated += 1;
    ideaIndex += 1;
  }
}

const totalIdeas = data.records.reduce((sum, record) => sum + record.ideas.length, 0);
if (updated !== totalIdeas) throw new Error(`Expected ${totalIdeas} ideas but updated ${updated}.`);

fs.writeFileSync(dataPath, JSON.stringify(data));
console.log(`Added learning goals and classroom examples to ${updated} lesson ideas.`);
