/**
 * Homepage.
 *
 * Section order is the argument: the premise, then what we build, then how it
 * fits together, then how we deliver it, then who we are, then what we have
 * published. Ink and paper alternate down the page so no two consecutive
 * sections share a rhythm.
 */
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { Hero } from '../components/sections/Hero';
import { Premise } from '../components/sections/Premise';
import { SolutionsShowcase } from '../components/sections/SolutionsShowcase';
import { Architecture } from '../components/sections/Architecture';
import { Engagement } from '../components/sections/Engagement';
import { Principles, Ecosystem, InsightsFeature } from '../components/sections/Principles';

export default function HomePage() {
  return (
    <>
      <Seo meta={metaFor('home')} />
      <Hero />
      <Premise />
      <SolutionsShowcase />
      <Architecture />
      <Engagement />
      <Principles />
      <Ecosystem />
      <InsightsFeature />
    </>
  );
}