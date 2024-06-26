'use client';

import { useEffect, useRef } from 'react';
import { deleteAlbum } from '@/actions/AlbumSettingsDialogActions';
import { MessageType } from '@/types';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';

import { isDialogOpenAtom, selectedAlbumAtom } from '@/lib/atoms/albumSettingsDialog';
import { ConfirmationDialog } from '../ConfirmationDialog';

export const DeleteAlbumAction = () => {
	const setIsDialogOpen = useSetAtom(isDialogOpenAtom);
	const album = useAtomValue(selectedAlbumAtom);

	const [state, formAction] = useFormState(deleteAlbum, {
		message: '',
		type: MessageType.Uninitialized
	});

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state.type === MessageType.Error) toast.error(state.message);
		else if (state.type === MessageType.Success) {
			toast.success(state.message);
			setIsDialogOpen(false);
		}

		return () => {
			if (state.type === MessageType.Success) {
				state.type = MessageType.Uninitialized;
				state.message = '';
			}
		};
	}, [state.message, state.type, setIsDialogOpen, state]);

	return (
		<form action={formAction} ref={formRef} className="w-full h-full">
			<input type="hidden" name="uuid" value={album?.uuid} />
			<ConfirmationDialog
				description="This action will delete the album."
				callback={() => formRef.current?.requestSubmit()}
			>
				<button type="button" className="w-full h-full flex px-2 py-1.5 cursor-default">
					Delete album
				</button>
			</ConfirmationDialog>
		</form>
	);
};
