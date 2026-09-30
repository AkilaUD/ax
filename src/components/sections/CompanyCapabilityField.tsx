import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { routes } from '../../data/site';
import { solutions } from '../../data/solutions';
import { useGsapContext } from '../../hooks/useGsapContext';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';

const capabilityPositions = ['company-field__node--top', 'company-field__node--right', 'company-field__node--bottom', 'company-field__node--left'];

export function CompanyCapabilityField() {
  const reduced = usePrefersReducedMotion();
  const scope = useGsapContext(() => {
    const lines = '[data-field-line]';
    const nodes = '[data-field-node]';

    if (reduced) {
      gsap.set([lines, nodes], { clearProps: 'all' });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
    timeline
      .fromTo(lines, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.9, stagger: 0.12 })
      .fromTo(nodes, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, '-=0.42')
      .fromTo('[data-field-center]', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.35');
  }, [reduced]);

  return (
    <div
      ref={scope}
      className="company-field"
      aria-label="Axleta company capability field"
      data-company-field
    >
      <div className="company-field__header">
        <span className="label text-accent-300">CAPABILITY FIELD</span>
        <span className="label text-neutral-500">Company view / 04 practices</span>
      </div>

      <div className="company-field__map">
        <span className="company-field__line company-field__line--vertical" data-field-line aria-hidden="true" />
        <span className="company-field__line company-field__line--horizontal" data-field-line aria-hidden="true" />
        <span className="company-field__line company-field__line--diagonal-one" data-field-line aria-hidden="true" />
        <span className="company-field__line company-field__line--diagonal-two" data-field-line aria-hidden="true" />

        <div className="company-field__center" data-field-center>
          <span className="label text-accent-300">AXLETA</span>
          <strong>Technology + advancement</strong>
          <span className="label text-neutral-500">For SME operations</span>
        </div>

        {solutions.map((solution, index) => (
          <Link
            key={solution.id}
            to={`${routes.solutions}#${solution.anchor}`}
            className={`company-field__node ${capabilityPositions[index]}`}
            data-field-node
          >
            <span className="label text-accent-300">{solution.number}</span>
            <strong>{solution.category}</strong>
            <span>{solution.architecturalLabel}</span>
            <span className="company-field__node-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>

      <div className="company-field__footer">
        <span>Canada / Sri Lanka / globally</span>
        <span>Business context before system choice</span>
      </div>
    </div>
  );
}
