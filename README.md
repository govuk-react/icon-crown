# @govuk-react/icon-crown

The GOV.UK crown and logotype as React components. They render the same SVG as govuk-frontend 6.6.0's logo, so they slot into the classes of [govuk-frontend-react](https://github.com/penx/govuk-frontend-react) components, which ship no Crown copyright artwork themselves.

```tsx
import { Crown, Logo } from '@govuk-react/icon-crown';

<Crown className="govuk-footer__crown" />
<Logo className="govuk-header__logotype" ariaLabelText="GOV.UK" />
```

- `Logo` renders the Tudor crown and the GOV.UK logotype. Pass `useLogotype={false}` for the crown alone.
- `Crown` is `Logo` without the logotype.
- `ariaLabelText` gives the SVG `role="img"`, an `aria-label` and a `<title>`. Without it the SVG is `role="presentation"`.

ESM only, React 19 or later.

## Licence

© Crown copyright. See [LICENSE.txt](LICENSE.txt).
