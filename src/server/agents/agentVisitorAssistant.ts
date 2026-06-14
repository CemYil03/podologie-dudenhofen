import type { GoogleLanguageModelOptions } from '@ai-sdk/google';
import type { ToolLoopAgentOnStepFinishCallback } from 'ai';
import { ToolLoopAgent, hasToolCall, stepCountIs } from 'ai';
import type { GqlCChatAssistantOptions } from '../../web/graphql/generated';
import type { ServerRuntime } from '../domain/ServerRuntime';
import type { GqlSSession } from '../graphql/generated';
import { PODOLOGIE_FACTS } from './podologieFacts';
import { toolPromptUserForInput } from './toolPromptUserForInput';

// Public-website assistant. Backs the `visitorAssistant` chat surface — the
// floating widget visitors reach without signing up. Counterpart to
// `agentAdminAssistant`, which serves the practice owner.
//
// Scope: top-of-funnel Q&A about the practice (services, hours, address,
// directions, what to bring to a first appointment, who pays). Explicitly
// NOT: medical advice, price quotes, diagnosis. When the visitor's question
// shifts toward booking or anything outside this scope, the assistant points
// at the contact CTA on `/kontakt#anfrage` and the phone number.
//
// Tool set is intentionally narrow: only `promptUserForInput` for any
// follow-up structured info the assistant needs (e.g. "for which symptom?").
// Outbound side-effects (sending an appointment-request email, writing to a
// CRM) will land later as approval-gated tools — the same machinery
// `agentAdminAssistant` uses, just wired into this agent's `tools` map.

interface AgentVisitorAssistantOptions {
    assistantOptions: GqlCChatAssistantOptions;
    session: GqlSSession;
    serverRuntime: ServerRuntime;
    onStepFinish: ToolLoopAgentOnStepFinishCallback<any>;
}

const VISITOR_INSTRUCTIONS = [
    'Du bist der Online-Assistent der Podologie-Praxis von Annette Yilmaz in Dudenhofen.',
    'Antworte ruhig, sachlich und kurz — wie eine freundliche Sprechstundenhilfe, nicht wie ein Marketingtext.',
    'Antworte standardmäßig auf Deutsch. Wechsle ins Englische, wenn die Nutzerin oder der Nutzer auf Englisch schreibt.',
    '',
    'Praxisdaten (Stand Juni 2026):',
    `- Behandlerin: ${PODOLOGIE_FACTS.practitioner}`,
    `- Adresse: ${PODOLOGIE_FACTS.address}`,
    `- Telefon: ${PODOLOGIE_FACTS.phone}`,
    `- E-Mail: ${PODOLOGIE_FACTS.email}`,
    `- Öffnungszeiten: ${PODOLOGIE_FACTS.hours}`,
    `- Anfahrt mit ÖPNV: ${PODOLOGIE_FACTS.transit}`,
    '',
    'Leistungen:',
    ...PODOLOGIE_FACTS.services.map((s) => `- ${s}`),
    '',
    'Verlinke bei passenden Fragen die entsprechende Seite des Praxis-Webauftritts.',
    'Verwende dafür IMMER Markdown-Linksyntax mit relativen URLs, z. B. `[Leistungsübersicht](/leistungen)` — niemals nackte Pfade wie `/leistungen` in den Fließtext schreiben. Der Linktext soll natürlich im Satz stehen.',
    'Verfügbare Seiten:',
    `- Leistungsübersicht: ${PODOLOGIE_FACTS.pageAnchors.services}`,
    `- "Brauche ich eine Podologin?": ${PODOLOGIE_FACTS.pageAnchors.servicesNeed}`,
    `- Erster Termin / was mitbringen: ${PODOLOGIE_FACTS.pageAnchors.firstAppointment}`,
    `- Kosten / Krankenkasse: ${PODOLOGIE_FACTS.pageAnchors.costs}`,
    `- Anfahrt: ${PODOLOGIE_FACTS.pageAnchors.directions}`,
    `- Terminanfragen / Telefon: ${PODOLOGIE_FACTS.pageAnchors.contactRequest}`,
    '',
    'Was du nicht tust:',
    '- Keine medizinische Beratung, keine Diagnosen, keine Empfehlungen zu Medikamenten oder Behandlungsabläufen.',
    '- Keine konkreten Preise nennen (außer dem Hinweis, dass die gesetzliche Krankenkasse podologische Leistungen mit ärztlicher Verordnung übernimmt).',
    '- Keine Termine vereinbaren oder zusagen — verweise immer auf die Telefonnummer und unsere Anrufzeiten (Mo–Fr 08:00–16:00).',
    '',
    'Wenn du etwas nicht sicher beantworten kannst oder die Frage außerhalb dieses Rahmens liegt, sage das ehrlich und verweise auf die Telefonnummer.',
    'Wenn du strukturierte Angaben brauchst (z. B. ein Wunschdatum für einen Termin), nutze das `promptUserForInput`-Werkzeug.',
].join('\n');

export async function agentVisitorAssistant({
    assistantOptions: _assistantOptions,
    session: _session,
    serverRuntime,
    onStepFinish,
}: AgentVisitorAssistantOptions) {
    return new ToolLoopAgent({
        model: serverRuntime.ai.userConversationModel(),
        onStepFinish,
        providerOptions: {
            google: {
                // Same Gemini-specific knobs as `agentAdminAssistant`: thinking
                // off to dodge MALFORMED_FUNCTION_CALL on Flash, and structured
                // outputs so the `promptUserForInput` flat schema validates.
                thinkingConfig: { thinkingBudget: 0 },
                structuredOutputs: true,
            } satisfies GoogleLanguageModelOptions,
        },
        stopWhen: [
            stepCountIs(5),
            // `promptUserForInput` hands the turn back to the visitor — the
            // assistant must stop until the user submits answers (or pivots
            // to a free-text message).
            hasToolCall('promptUserForInput'),
        ],
        instructions: VISITOR_INSTRUCTIONS,
        // Visitor-side tool set is intentionally narrow today: only the
        // structured-input collector. Approval-gated tools (e.g. an
        // appointment-request mailer) will land here later — they reuse the
        // same `requireToolCallApprovals` plumbing the admin agent uses.
        tools: {
            promptUserForInput: toolPromptUserForInput(),
        },
    });
}
