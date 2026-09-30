import { useState } from 'react';
import { solutions } from '../../data/solutions';
import { cn } from '../../lib/utils';

type ConsoleNode = {
  id: string;
  label: string;
  code: string;
  detail: string;
};

const consoleNodes: ConsoleNode[] = [
  {
    id: 'erp',
    label: 'ERP CORE',
    code: '01 / TRANSACTIONS',
    detail: 'Sales, purchasing, financials, inventory and manufacturing in one operating core.',
  },
  {
    id: 'applications',
    label: 'APPLICATIONS',
    code: '02 / EXTENSIONS',
    detail: 'Companion tools for the work standard ERP coverage does not reach.',
  },
  {
    id: 'infrastructure',
    label: 'INFRASTRUCTURE',
    code: '03 / GROUND',
    detail: 'Compute, storage, network, security and virtualisation beneath the stack.',
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    code: '04 / FLOW',
    detail: 'Direct pathways between systems, without the repetitive hand-offs.',
  },
];

export function HeroSystemConsole() {
  const [activeId, setActiveId] = useState('erp');
  const active = consoleNodes.find((node) => node.id === activeId) ?? consoleNodes[0];

  return (
    <section
      className="hero-console"
      aria-labelledby="hero-console-title"
      data-hero-console
    >
      <div className="hero-console__bar">
        <div>
          <p className="label text-accent-300">Axleta / system field</p>
          <h2 id="hero-console-title" className="sr-only">
            Axleta connected system field
          </h2>
        </div>
        <span className="hero-console__status">
          <span aria-hidden="true" className="hero-console__status-dot" />
          SYSTEM / LIVE
        </span>
      </div>

      <div className="hero-console__topology" aria-label="Selectable system layers">
        <svg
          aria-hidden="true"
          className="hero-console__paths"
          viewBox="0 0 520 390"
          fill="none"
        >
          <path d="M260 76V312" pathLength="1" className="hero-console__path" />
          <path d="M120 194H400" pathLength="1" className="hero-console__path" />
          <circle cx="260" cy="194" r="5" className="hero-console__junction" />
          <circle cx="260" cy="194" r="14" className="hero-console__junction-ring" />
        </svg>

        <div className="hero-console__node hero-console__node--erp">
          <ConsoleNodeButton node={consoleNodes[0]} activeId={activeId} onSelect={setActiveId} />
        </div>
        <div className="hero-console__node hero-console__node--applications">
          <ConsoleNodeButton node={consoleNodes[1]} activeId={activeId} onSelect={setActiveId} />
        </div>
        <div className="hero-console__node hero-console__node--infrastructure">
          <ConsoleNodeButton node={consoleNodes[2]} activeId={activeId} onSelect={setActiveId} />
        </div>
        <div className="hero-console__node hero-console__node--automation">
          <ConsoleNodeButton node={consoleNodes[3]} activeId={activeId} onSelect={setActiveId} />
        </div>

        <span className="hero-console__signal hero-console__signal--one" aria-hidden="true" />
        <span className="hero-console__signal hero-console__signal--two" aria-hidden="true" />
      </div>

      <div className="hero-console__readout">
        <div>
          <p className="label text-neutral-500">Selected layer</p>
          <p className="mt-2 font-display text-2xl tracking-tightest text-paper">{active.label}</p>
        </div>
        <p className="max-w-[24rem] text-sm leading-relaxed text-neutral-300">{active.detail}</p>
      </div>

      <div className="hero-console__footer">
        <span>04 connected layers</span>
        <span>1 operating architecture</span>
        <span className="hidden sm:inline">Signal path / stable</span>
      </div>
    </section>
  );
}

function ConsoleNodeButton({
  node,
  activeId,
  onSelect,
}: {
  node: ConsoleNode;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const selected = node.id === activeId;

  return (
    <button
      type="button"
      className={cn('hero-console__node-button', selected && 'is-selected')}
      aria-pressed={selected}
      onClick={() => onSelect(node.id)}
    >
      <span className="hero-console__node-code">{node.code}</span>
      <span className="hero-console__node-label">{node.label}</span>
      <span className="hero-console__node-action" aria-hidden="true">
        {selected ? 'ACTIVE' : 'SELECT'}
      </span>
    </button>
  );
}

export function HeroConsoleIndex() {
  return (
    <div className="hero-console-index" aria-label="System index">
      <span className="label text-neutral-500">System index</span>
      <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
        {solutions.map((solution) => (
          <div key={solution.id} className="flex items-center gap-3">
            <span className="label text-accent-300">{solution.number}</span>
            <span className="text-sm text-neutral-300">{solution.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
