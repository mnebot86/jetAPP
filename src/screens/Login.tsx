import {
	AlertCircleIcon,
	Box,
	Button,
	ButtonSpinner,
	ButtonText,
	EyeIcon,
	EyeOffIcon,
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
	Heading,
	Input,
	InputField,
	InputIcon,
	InputSlot,
	LockIcon,
	MailIcon,
	Text,
	VStack,
} from '@gluestack-ui/themed';
import { login } from 'network/auth';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/user';
import { LoginResponse } from 'utils/interface';

const Login = () => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isButtonDisable = useCallback(() => {
		if (!email.length || !password.length || isLoading) {
			return true;
		}

		return false;
	}, [email, password, isLoading]);

	const toggleIsPasswordVisible = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	const handleOnSubmit = useCallback(async () => {
		if (!email.length || !password.length) return;

		setIsLoading(true);

		const credentials = {
			email,
			password,
		};

		try {
			const user = (await login(credentials)) as LoginResponse;

			if (user.error) {
				setError(user.error);
			} else {
				dispatch(setUser(user));
			}
		} catch (error) {
			throw error;
		} finally {
			setIsLoading(false);
		}
	}, [email, password, dispatch]);

	return (
		<Box flex={1} justifyContent="center" p={30}>
			<Heading size="5xl" bold>
				Login
			</Heading>

			<Text size="lg" bold>
				Please sign in to continue.
			</Text>

			<VStack w="$full" mt={48}>
				<FormControl size="lg" mb="$8" isRequired>
					<FormControlLabel>
						<FormControlLabelText>Email</FormControlLabelText>
					</FormControlLabel>

					<Input>
						<InputSlot pl="$3">
							<InputIcon as={MailIcon} />
						</InputSlot>

						<InputField type="text" onChangeText={setEmail} autoCapitalize="none" />
					</Input>
				</FormControl>

				<FormControl size="lg" mb="$8" isRequired>
					<FormControlLabel>
						<FormControlLabelText>Password</FormControlLabelText>
					</FormControlLabel>

					<Input variant="outline">
						<InputSlot pl="$3" onPress={toggleIsPasswordVisible}>
							<InputIcon as={LockIcon} />
						</InputSlot>

						<InputField
							type={isPasswordVisible ? 'text' : 'password'}
							onChangeText={setPassword}
							autoCapitalize="none"
						/>

						<InputSlot pr="$3" onPress={toggleIsPasswordVisible}>
							{isPasswordVisible ? (
								<InputIcon as={EyeIcon} />
							) : (
								<InputIcon as={EyeOffIcon} />
							)}
						</InputSlot>
					</Input>
				</FormControl>

				<FormControl isInvalid={!!error}>
					<FormControlError mb="$4">
						<FormControlErrorIcon as={AlertCircleIcon} />

						<FormControlErrorText>{error}</FormControlErrorText>
					</FormControlError>

					<Button size="lg" onPress={handleOnSubmit} isDisabled={isButtonDisable()}>
						{isLoading ? <ButtonSpinner animating /> : <ButtonText>Enter</ButtonText>}
					</Button>
				</FormControl>
			</VStack>
		</Box>
	);
};

export default Login;
