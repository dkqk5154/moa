import React from 'react';
import { importMDX } from 'mdx.macro';

import PageTemplate from 'components/templates/PageTemplate';

const TermMdx = React.lazy(() => importMDX('./Term.mdx'));

interface TermPageInterface {
	match: any;
	location: any;
	history: any;
}

const TermPage = ({
	match,
	location,
	history,
}: TermPageInterface): JSX.Element => {
	return (
		<PageTemplate>
			<TermMdx />
		</PageTemplate>
	);
};

export default TermPage;
