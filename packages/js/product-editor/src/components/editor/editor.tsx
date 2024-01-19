/**
 * External dependencies
 */
import {
	createElement,
	StrictMode,
	Fragment,
	useState,
} from '@wordpress/element';
import {
	LayoutContextProvider,
	useExtendLayout,
} from '@woocommerce/admin-layout';
import { Popover } from '@wordpress/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @woocommerce/dependency-group
import { EntityProvider } from '@wordpress/core-data';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @woocommerce/dependency-group
import { ShortcutProvider } from '@wordpress/keyboard-shortcuts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @woocommerce/dependency-group
import { InterfaceSkeleton } from '@wordpress/interface';

/**
 * Internal dependencies
 */
import { Header } from '../header';
import { BlockEditor } from '../block-editor';
import { EditorLoadingContext } from '../../contexts/editor-loading-context';
import { ValidationProvider } from '../../contexts/validation-context';
import { EditorProps } from './types';

export function Editor( {
	product,
	productType = 'product',
	settings,
}: EditorProps ) {
	const [ isEditorLoading, setIsEditorLoading ] = useState( true );
	const [ selectedTab, setSelectedTab ] = useState< string | null >( null );

	const updatedLayoutContext = useExtendLayout( 'product-block-editor' );

	const productId = product?.id || -1;

	return (
		<LayoutContextProvider value={ updatedLayoutContext }>
			<StrictMode>
				<EntityProvider
					kind="postType"
					type={ productType }
					id={ productId }
				>
					<ShortcutProvider>
						<ValidationProvider initialValue={ product }>
							<EditorLoadingContext.Provider
								value={ isEditorLoading }
							>
								<InterfaceSkeleton
									header={
										<Header
											onTabSelect={ setSelectedTab }
											productType={ productType }
										/>
									}
									content={
										<>
											<BlockEditor
												settings={ settings }
												postType={ productType }
												productId={ productId }
												context={ {
													selectedTab,
													postType: productType,
													postId: productId,
												} }
												setIsEditorLoading={
													setIsEditorLoading
												}
											/>
										</>
									}
								/>
							</EditorLoadingContext.Provider>
							<Popover.Slot />
						</ValidationProvider>
					</ShortcutProvider>
				</EntityProvider>
			</StrictMode>
		</LayoutContextProvider>
	);
}
