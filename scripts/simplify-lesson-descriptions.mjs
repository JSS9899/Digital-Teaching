import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(scriptDir, "../app/curriculum-data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

const directReplacements = [
  [/After a brief teacher model,/g, "After the teacher shows an example,"],
  [/Teams reveal one clue at a time as they/g, "Teams look at one clue at a time while they"],
  [/, share a draft with a partner and use comment prompts for accuracy, evidence and audience\./g, ". They share a draft with a partner, who points out one strength and one useful improvement."],
  [/share a draft with a partner and use comment prompts for accuracy, evidence and audience\./g, "share a draft with a partner. Their partner points out one strength and one useful improvement."],
  [/, assign contrasting evidence-based viewpoints and record a two-minute panel\./g, ". Give each pupil a different opinion to share, then record a two-minute discussion."],
  [/assign contrasting evidence-based viewpoints and record a two-minute panel\./g, "give each pupil a different opinion to share, then record a two-minute discussion."],
  [/ and create a four-slide explainer: question, evidence, reasoning and conclusion\./g, ". They create four simple slides showing the question, evidence, explanation and conclusion."],
  [/ and build three slides: evidence, explanation and conclusion\./g, ". They make three slides showing their evidence, explanation and conclusion."],
  [/ and display a draft response\./g, ". They display a first version of their work."],
  [/ by programming a simple interactive model or quiz\./g, ". They turn it into a simple interactive model or quiz."],
  [/ by creating a simple simulation or branching model\./g, ". They make a simple model that lets people try different choices."],
  [/ by building a branching decision model\./g, ". They make a choose-your-own-path diagram."],
  [/ and produce a concise case study combining text, labelled visuals and narration\./g, ". They create a short case study using text, labelled pictures and narration."],
  [/ and create a short multimedia field-guide entry\./g, ". They create a short digital field-guide entry."],
  [/ by coding a small MakeCode output, counter or decision\./g, ". They use MakeCode to build a small counter, display or decision tool."],
  [/ through a coded prototype that uses input, processing and output\./g, ". They build a small piece of code with an input, a process and an output."],
  [/ using a dynamic construction, graph or model\./g, ". They use an interactive graph or model."],
  [/, enter a small teacher-approved dataset and create a clear table or chart\./g, ". They enter a small set of data chosen by the teacher and create a clear table or chart."],
  [/ with a relevant small dataset\./g, ". They use a small set of relevant data."],
  [/ using two teacher-curated sources\./g, ". They use two sources chosen by the teacher."],
  [/ using teacher-curated sources\./g, ". They use a small set of sources chosen by the teacher."],
  [/ using two or three carefully chosen locations\./g, ". They compare evidence from two or three places."],
  [/ through a short indoor or outdoor observation walk\./g, ". They take a short observation walk inside or outside."],
  [/ through a fictional, age-appropriate scenario\./g, ". They act out a simple made-up situation."],
  [/ by creating three freeze frames showing a beginning, change and outcome\./g, ". They create three freeze frames showing the beginning, a change and the ending."],
  [/ at a short circuit of challenges\./g, ". They work through a few short challenges."],
  [/ at short practical stations\./g, ". They work through a few short activity stations."],
  [/ by sorting examples and writing the rule for each group\./g, ". They sort examples into groups and write a simple rule for each group."],
  [/ by writing, linking and questioning ideas without speaking for five minutes\./g, ". For five minutes, they silently write, connect and question ideas."],
  [/ by choosing a provisional viewpoint, sharing evidence and questioning another corner\./g, ". They choose a starting opinion, share evidence and question another group's view."],
  [/ by becoming a living graph or model\./g, ". They make a human graph or model by standing in different positions."],
  [/ by giving a 'robot' precise step-by-step instructions\./g, ". One pupil pretends to be a robot while their partner gives clear step-by-step instructions."],
  [/ with a limited set of tokens\./g, ". Give each team a limited number of counters to make their choices."],
  [/ by connecting concepts, examples and consequences on a large map\./g, ". They connect ideas and examples on a large class map."],
  [/ through a brief anonymous or non-personal survey\./g, ". They run a short anonymous class survey."],
  [/ using objects or paper pieces\./g, ". They use objects or paper pieces to show each stage."],
  [/ through a three-scene ScratchJr story\./g, ". They use ScratchJr to make a three-part story."],
  [/ and film a short demonstration in three shots: show, explain and check\./g, ". They film three short clips: show it, explain it and check it."],
  [/ and create a two-page picture book\./g, ". They create a two-page picture book."],
  [/ by placing themselves or evidence cards along a continuum\./g, ". They place themselves or evidence cards along a line from one view to another."],
  [/ by ranking questions from most to least useful\./g, ". They rank questions from most useful to least useful."],
  [/They accept or reject feedback with a brief reason\./g, "They decide which feedback to use and briefly explain why."],
  [/They use peer feedback to improve accuracy and clarity\./g, "Another pair suggests one improvement, which they use to make their work clearer."],
  [/They test it with a partner, find one error or ambiguity and improve it\./g, "They test it with a partner, find one mistake or unclear part and improve it."],
  [/Peers leave one precise strength and one question; pupils then revise one part and explain why\./g, "Other pupils share one thing that works well and ask one helpful question. Pupils then improve one part and explain their change."],
  [/They finish with a balanced conclusion and a question requiring further evidence\./g, "They end by agreeing on what worked, what could improve and one question they still have."],
  [/They use captions and arrows, then exchange one specific improvement with another pair\./g, "They add captions and arrows, then swap with another pair and suggest one improvement."],
  [/They annotate claims, evidence and uncertainty, then write a concise judgement that acknowledges a limitation\./g, "They label the main points and supporting evidence, noting anything they are unsure about. They then write a short conclusion and mention one limitation."],
  [/The group then identifies the strongest evidence and one unresolved question\./g, "The group chooses the strongest evidence and writes down one question they still have."],
  [/They state the assumptions, test contrasting inputs and explain where the model differs from reality\./g, "They explain what they have assumed, try different choices and discuss how the model is different from real life."],
  [/They record only relevant evidence, compare findings and note one limitation in the method\./g, "They record the most useful evidence, compare what they found and identify one thing the method did not show."],
  [/They finish by stating whether and why their view changed\./g, "They finish by saying whether their opinion changed and why."],
  [/A partner checks whether the evidence supports the message\./g, "A partner checks that the examples support the main message."],
  [/They capture and annotate frames to show what changed, what stayed the same or why a choice mattered\./g, "They save and label screenshots to show what changed, what stayed the same and why it mattered."],
  [/They combine a labelled image, concise text and an optional recording for accessibility\./g, "They combine a labelled picture, short text and an optional voice recording."],
  [/At each station they record one observation and one inference, then use the collected evidence to reach a conclusion\./g, "At each station, they write down one thing they noticed and what they think it means. They use all the evidence to agree on a conclusion."],
  [/They test the sequence, identify the first point of failure and debug it together\./g, "They test the steps, find where it first goes wrong and fix it together."],
  [/Observers identify the clues and suggest one clearer choice\./g, "The audience spots the clues and suggests one clearer choice."],
  [/They write two observations and one question raised by the data\./g, "They write down two things they notice and one question they still have."],
  [/They cite teacher-provided sources and tailor the explanation to a defined audience\./g, "They name the sources provided by the teacher and make the explanation suitable for their chosen audience."],
  [/They justify positions, listen to a challenge and move only when the evidence persuades them\./g, "They explain their position, listen to a different view and move only if the evidence changes their mind."],
  [/Each choice shows likely consequences, supporting evidence and a route for revising the decision\./g, "For each choice, they show what might happen, the evidence behind it and how the decision could be changed."],
  [/They select a suitable calculation or chart, explain the pattern and check whether the visual could mislead its audience\./g, "They choose a suitable calculation or chart, explain the pattern and check whether the visual might give the wrong impression."],
  [/They separate observation from inference, revise an early idea and explain which clue changed their thinking\./g, "They separate what they can see from what they think it means. If a new clue changes their mind, they explain why."],
  [/They trace connections aloud, remove one card to test its importance and repair the sequence\./g, "They talk through the links, remove one card to see why it matters and then repair the sequence."],
  [/They pause at each decision, predict consequences and replay the scene with a better-supported choice\./g, "They pause at each choice, discuss what might happen and replay the scene using a better choice."],
  [/Each group becomes expert in one example, then teaches it to others using a demonstration and one checking question\./g, "At the end, each group teaches one example to the class and asks a quick checking question."],
  [/Each page combines a drawing or photograph with a brief voice recording\./g, "Each page uses a drawing or photo and a short voice recording."],
  [/They justify priorities, reveal consequence cards and revise the plan while keeping a clear record of trade-offs\./g, "They explain their priorities, turn over consequence cards and change their plan when needed. They keep a simple record of any compromises."],
  [/They improve the top question, explain the ranking and identify what evidence would answer it\./g, "They improve the top question, explain why it is useful and decide what evidence would answer it."],
  [/One pupil performs or explains while the other observes against a criterion, then they swap and improve\./g, "One pupil completes or explains the task while the other checks one success point. They then swap roles and improve."],
  [/They review the clip and improve one unclear part\./g, "They watch the clip and improve one unclear part."],
  [/They photograph each stage to make a short stop-motion explanation, then discuss what the sequence shows\./g, "They photograph each stage to make a short stop-motion video, then talk about what it shows."],
  [/Pupils check the scale or categories, describe a visible pattern and discuss what the representation leaves out\./g, "Pupils check the scale or groups, describe a pattern they can see and discuss what the model does not show."],
  [/They capture evidence from maps or imagery and add captions that explain the connection\./g, "They collect evidence from maps or images and add captions explaining what it shows."],
  [/They test against one clear criterion, record what happened and make one evidence-led improvement\./g, "They test it against one clear success point, record what happens and make one improvement."],
  [/They predict the result, run the simulation and debug one issue\./g, "They predict what will happen, run the model and fix one problem."],
  [/Pupils review the summary, compare responses and explain one limitation of the question or sample\./g, "Pupils compare the answers and explain one problem with the question or group surveyed."],
  [/They vary one element at a time, capture evidence and generalise what remains true\./g, "They change one thing at a time, save evidence and explain what always stays true."],
  [/They test edge cases, debug the code and document one design improvement\./g, "They test unusual examples, fix any problems in the code and explain one improvement."],
  [/Each pupil adds one evidence card, then the group sorts the cards and writes a shared evidence-based conclusion\./g, "Each pupil adds one evidence card. The group sorts the cards and agrees on a conclusion based on what they found."],
  [/They sequence the events, add simple narration and replay it to check that the idea is clear\./g, "They put the events in order, add a short voice recording and replay the story to check it makes sense."],
  [/Each new link needs a spoken reason, and the class reviews the weakest connection\./g, "Pupils explain each link aloud, then the class improves the least convincing connection."],
  [/They circle or label three useful details and record a short spoken explanation\./g, "They circle or label three useful details and make a short voice recording to explain them."],
  [/They listen back and identify the clearest evidence of learning\./g, "They listen back and choose the part that best shows their learning."],
];

function simplifyDescription(description) {
  let text = description.trim();

  text = text.replace(
    /Pupils justify their choices with evidence and evaluate how well the outcome demonstrates ([^.]+)\./g,
    "Pupils then explain the choices they made and how well their final work meets the learning goal."
  );
  text = text.replace(
    /Pairs compare outcomes and give one reason that demonstrates ([^.]+)\./g,
    "Pairs compare their work and explain how it meets the learning goal."
  );
  text = text.replace(
    /Finish with a spoken, drawn or recorded explanation that shows ([^.]+)\./g,
    "To finish, pupils share what they learned by talking, drawing or making a short recording."
  );

  text = text
    .replace(/To finish, pupils explain their choices and how the activity helped them understand [^.]+\./g, "Pupils then explain the choices they made and how well their final work meets the learning goal.")
    .replace(/Pairs compare their work and explain how it shows their understanding of [^.]+\./g, "Pairs compare their work and explain how it meets the learning goal.")
    .replace(/To finish, pupils explain what they learned about [^.]+ by talking, drawing or making a short recording\./g, "To finish, pupils share what they learned by talking, drawing or making a short recording.")
    .replace(/Groups revise a small section of work after audience feedback\./g, "Groups improve a small part of their work after hearing feedback.")
    .replace(/They finish by agreeing on a balanced conclusion and one question they still want to explore\./g, "They end by agreeing on what worked, what could improve and one question they still have.")
    .replace(/Give each pupil a different point of view to explore/g, "Give each pupil a different opinion to share");

  for (const [pattern, replacement] of directReplacements) {
    text = text.replace(pattern, replacement);
  }

  return text
    .replace(/review a user interface or dataset and improve its accuracy or clarity/gi, "look at an app screen or set of data and make it clearer or more accurate")
    .replace(/weigh options, information and likely consequences in a fictional decision/gi, "compare different choices in a made-up situation and discuss what might happen after each one")
    .replace(/identify emotional clues in fictional situations/gi, "spot clues about feelings in made-up situations")
    .replace(/distinguish immediate outcomes from longer-term consequences/gi, "tell the difference between what happens straight away and what may happen later")
    .replace(/divide a period into meaningful phases/gi, "split a period of history into clear sections")
    .replace(/listen for key information, tone and non-verbal clues/gi, "listen for important information, the speaker's tone and clues that are not spoken")
    .replace(/represent a multiplicative relationship/gi, "show a multiplication pattern")
    .replace(/round values for a purpose and compare the approximation with the exact result/gi, "round numbers for a purpose and compare the estimate with the exact answer")
    .replace(/place varied values on a number line/gi, "place different numbers on a number line")
    .replace(/evaluate a user interface or dataset and improve its reliability or clarity/gi, "review an app screen or set of data and make it clearer or more accurate")
    .replace(/\bcontrasting\b/gi, "different")
    .replace(/\banalyse\b/gi, "look closely at")
    .replace(/\banalyses\b/gi, "looks closely at")
    .replace(/\bfictional\b/gi, "made-up")
    .replace(/\bdistinguish\b/gi, "tell the difference between")
    .replace(/\bspatial patterns\b/gi, "patterns across different places")
    .replace(/\bspatial pattern\b/gi, "pattern across different places")
    .replace(/\bmeaningful phases\b/gi, "clear sections")
    .replace(/\bnon-verbal clues\b/gi, "clues that are not spoken")
    .replace(/\brefine\b/gi, "improve")
    .replace(/\brefines\b/gi, "improves")
    .replace(/\brefined\b/gi, "improved")
    .replace(/\bage-appropriate\b/gi, "suitable for their age")
    .replace(/\bmultiplicative relationship\b/gi, "multiplication pattern")
    .replace(/\bproportional relationship\b/gi, "pattern between changing amounts")
    .replace(/\bproportional reasoning\b/gi, "working with changing amounts")
    .replace(/\bapproximation\b/gi, "estimate")
    .replace(/\binferred meaning\b/gi, "meaning that is not directly stated")
    .replace(/\binterpretation\b/gi, "explanation")
    .replace(/\binterpretations\b/gi, "explanations")
    .replace(/\blikely consequences\b/gi, "what is likely to happen")
    .replace(/\bconsequences\b/gi, "results")
    .replace(/\bconsequence\b/gi, "result")
    .replace(/\breliability\b/gi, "accuracy")
    .replace(/one disputed card after listening to another group's reasoning/gi, "one card they disagreed about after listening to the other group's explanation")
    .replace(/\bconcise\b/gi, "short")
    .replace(/\bambiguity\b/gi, "unclear part")
    .replace(/\banomalies\b/gi, "unusual results")
    .replace(/\bevidence-based\b/gi, "supported by evidence")
    .replace(/\bprovisional\b/gi, "starting")
    .replace(/\bannotate\b/gi, "label")
    .replace(/\bannotated\b/gi, "labelled")
    .replace(/\bjustify\b/gi, "explain")
    .replace(/\bjustifies\b/gi, "explains")
    .replace(/\bjustifying\b/gi, "explaining")
    .replace(/\bevaluate\b/gi, "review")
    .replace(/\bevaluates\b/gi, "reviews")
    .replace(/\bevaluating\b/gi, "reviewing")
    .replace(/\bcriterion\b/gi, "success point")
    .replace(/\bcriteria\b/gi, "success points")
    .replace(/\bspatial patterns\b/gi, "location patterns")
    .replace(/\binference\b/gi, "what they think it means")
    .replace(/\bvisuals\b/gi, "pictures")
    .replace(/\bimagery\b/gi, "images")
    .replace(/\s{2,}/g, " ")
    .replace(/\.\s*,/g, ".")
    .trim();
}

let changed = 0;
for (const record of data.records) {
  for (const idea of record.ideas) {
    const simplified = simplifyDescription(idea.description);
    if (simplified !== idea.description) changed += 1;
    idea.description = simplified;
  }
}

const totalIdeas = data.records.reduce((sum, record) => sum + record.ideas.length, 0);
fs.writeFileSync(dataPath, JSON.stringify(data));
console.log(`Checked ${totalIdeas} lesson descriptions; updated ${changed}.`);
