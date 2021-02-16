import styled from 'styled-components';
import { Label } from '@buffetjs/core';
/**
 * TODO: should not exist anymore with the Design System
 */
export const Title = styled.h2`
  text-transform: uppercase;
  color: ${({ theme }) => theme.main.colors.grey};
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
`;

export const ProfilePageLabel = styled(Label)`
  margin-bottom: 1rem;
`;

export const Spacer = styled.div`
  width: 3rem;
`;
