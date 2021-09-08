import React from 'react';
import { importMDX } from 'mdx.macro';

import PageTemplate from 'components/templates/PageTemplate';

const PrivacyMdx = React.lazy(() => importMDX('./Privacy.mdx'));

interface PrivacyPageInterface {
	match: any;
	location: any;
	history: any;
}

const PrivacyPage = ({
	match,
	location,
	history,
}: PrivacyPageInterface): JSX.Element => {
	return (
		<PageTemplate>
			<PrivacyMdx />
		</PageTemplate>
	);
};

export default PrivacyPage;
