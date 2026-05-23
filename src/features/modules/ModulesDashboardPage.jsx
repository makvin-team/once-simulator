import {motion} from 'framer-motion';
import {PILLARS, getModuleTitle} from '../../data/pillars.js';
import {useAppStore} from '../../state/useAppStore.js';
import {useT, format} from '../../i18n/index.js';
import {LanguageSwitcher} from '../../components/hud/LanguageSwitcher.jsx';

/**
 * Module Dashboard — second page of the flow.
 *
 * Renders a card grid of the chosen pillar's modules. Only modules with
 * `locked: false` AND a registered `scenarioId` are playable; the rest
 * render as muted "coming soon" tiles so the user can see the curriculum
 * scope but only one module fires up the 3D scene in the pilot.
 *
 * Picking a playable module drives the store to `view: 'simulation'`.
 */

export function ModulesDashboardPage() {
    const t = useT();
    const pillarId = useAppStore((s) => s.pillarId);
    const startModule = useAppStore((s) => s.startModule);
    const exitToRoleSelection = useAppStore((s) => s.exitToRoleSelection);
    const locale = useAppStore((s) => s.locale);

    const pillar = PILLARS[pillarId];
    const pillarCopy = t.pillars[pillarId] ?? {};

    if (!pillar) {
        return null;
    }

    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
            style={{
                position: 'absolute',
                inset: 0,
                overflowY: 'auto',
                background: 'var(--cream)',
            }}
        >
            <TopBar onExit={exitToRoleSelection}/>

            <div
                style={{
                    maxWidth: 1180,
                    margin: '0 auto',
                    padding: '28px 28px 80px',
                }}
            >
                <Header pillar={pillar} pillarCopy={pillarCopy} t={t}/>

                <div
                    style={{
                        marginTop: 28,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: 16,
                    }}
                >
                    {pillar.modules.map((module, idx) => {
                        const title = getModuleTitle(module.i18nKey, locale);
                        const playable = !module.locked && !!module.scenarioId;
                        return (
                            <ModuleCard
                                key={module.id}
                                title={title}
                                index={idx}
                                module={module}
                                playable={playable}
                                minutesLabel={format(t.modules.minutes, {n: module.durationMinutes})}
                                ctaLabel={t.modules.start}
                                statusLabel={
                                    playable ? t.modules.available : t.modules.locked
                                }
                                onStart={() => startModule(module.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

function TopBar({onExit}) {
    const t = useT();
    return (
        <div
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 24px',
                background: 'rgba(255, 246, 230, 0.92)',
                backdropFilter: 'blur(8px)',
                borderBottom: '3px solid var(--line)',
            }}
        >
            <button
                type="button"
                onClick={onExit}
                className="btn-plush ghost"
                style={{fontSize: 13, padding: '8px 16px'}}
            >
                ← {t.modules.chooseAnother}
            </button>
            <LanguageSwitcher/>
        </div>
    );
}

function Header({pillar, pillarCopy, t}) {
    return (
        <div style={{position: 'relative'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap'}}>
        <span
            style={{
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'var(--butter)',
                padding: '6px 14px',
                borderRadius: 999,
                border: '2.5px solid var(--line)',
                boxShadow: 'var(--plush-tiny)',
            }}
        >
          {t.modules.eyebrow} · {pillarCopy.shortLabel}
        </span>
                <span
                    style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: 'var(--ink-2)',
                    }}
                >
          {pillar.modules.length} {pillar.modules.length === 1 ? 'module' : 'modules'} · {pillar.sessionMinutes}m
        </span>
            </div>
            <h1
                style={{
                    fontSize: 'clamp(30px, 4vw, 42px)',
                    fontWeight: 900,
                    marginTop: 12,
                    color: 'var(--ink)',
                    letterSpacing: '-0.02em',
                }}
            >
                {pillarCopy.title}
            </h1>
            <p
                style={{
                    marginTop: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--ink-2)',
                    maxWidth: 720,
                    lineHeight: 1.5,
                }}
            >
                {pillarCopy.summary}
            </p>
        </div>
    );
}

function ModuleCard({title, module, index, playable, minutesLabel, ctaLabel, statusLabel, onStart}) {
    const tiltDirections = [-0.4, 0.3, -0.5, 0.4, -0.3];
    const tilt = tiltDirections[index % tiltDirections.length];

    return (
        <motion.button
            type="button"
            onClick={playable ? onStart : undefined}
            disabled={!playable}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.04 * index, type: 'spring', stiffness: 240, damping: 22}}
            whileHover={playable ? {y: -4, rotate: 0} : {}}
            whileTap={playable ? {y: 2} : {}}
            style={{
                textAlign: 'left',
                background: playable ? 'white' : 'var(--cream-2)',
                border: '3px solid var(--line)',
                borderRadius: 'var(--r-md)',
                padding: 16,
                cursor: playable ? 'pointer' : 'not-allowed',
                opacity: playable ? 1 : 0.7,
                boxShadow: playable ? 'var(--plush-sm)' : 'var(--plush-tiny)',
                fontFamily: 'inherit',
                position: 'relative',
                transform: `rotate(${tilt}deg)`,
            }}
        >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
        <span
            style={{
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
            }}
        >
          {module.id.toUpperCase()}
        </span>
                <span
                    style={{
                        fontSize: 10,
                        fontWeight: 900,
                        padding: '3px 9px',
                        borderRadius: 999,
                        border: '2px solid var(--line)',
                        background: playable ? 'var(--mint)' : 'var(--cream)',
                        color: 'var(--ink)',
                    }}
                >
          {statusLabel}
        </span>
            </div>

            <h3
                style={{
                    fontSize: 17,
                    fontWeight: 900,
                    marginTop: 10,
                    marginBottom: 0,
                    color: 'var(--ink)',
                    lineHeight: 1.2,
                }}
            >
                {title}
            </h3>

            <div
                style={{
                    marginTop: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                }}
            >
        <span
            style={{
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--ink-2)',
            }}
        >
          {minutesLabel}
        </span>
                {playable && (
                    <span
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: 12,
                            fontWeight: 900,
                            color: 'var(--ink)',
                            background: 'var(--peach)',
                            border: '2.5px solid var(--line)',
                            borderRadius: 999,
                            padding: '6px 12px',
                            boxShadow: '0 3px 0 var(--line)',
                        }}
                    >
            {ctaLabel} →
          </span>
                )}
            </div>
        </motion.button>
    );
}
