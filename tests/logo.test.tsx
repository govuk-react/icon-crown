import { renderToStaticMarkup } from 'react-dom/server';
import { parseDocument } from 'htmlparser2';
import type { ChildNode, Element } from 'domhandler';
import footer from 'govuk-frontend/dist/govuk/components/footer/fixtures.json';
import header from 'govuk-frontend/dist/govuk/components/header/fixtures.json';
import { Crown, Logo } from '../src';

function serialise(nodes: ChildNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === 'text') return node.data.trim() ? JSON.stringify(node.data.trim()) : '';
      if (node.type !== 'tag') return '';
      const el = node as Element;
      const attrs = Object.keys(el.attribs)
        .sort()
        .map((name) => ` ${name}="${el.attribs[name]}"`)
        .join('');
      return `<${el.name}${attrs}>${serialise(el.children)}</${el.name}>`;
    })
    .join('');
}

function svg(html: string, className: string): string {
  const match = new RegExp(`<svg[^>]*class="${className}"[\\s\\S]*?</svg>`).exec(html);
  if (!match) throw new Error(`No ${className} svg`);
  return serialise(parseDocument(match[0], { lowerCaseAttributeNames: true }).children);
}

function rendered(element: React.ReactElement): string {
  return serialise(
    parseDocument(renderToStaticMarkup(element), { lowerCaseAttributeNames: true }).children,
  );
}

const footerHtml = footer.fixtures.find((f) => f.name === 'default')!.html;
const headerHtml = header.fixtures.find((f) => f.name === 'default')!.html;

test('Crown matches the crown in govuk-frontend’s footer', () => {
  expect(rendered(<Crown className="govuk-footer__crown" />)).toBe(
    svg(footerHtml, 'govuk-footer__crown'),
  );
});

test('Logo matches the logo in govuk-frontend’s header', () => {
  expect(rendered(<Logo className="govuk-header__logotype" ariaLabelText="GOV.UK" />)).toBe(
    svg(headerHtml, 'govuk-header__logotype'),
  );
});
