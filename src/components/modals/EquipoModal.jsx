import React from 'react';
import { ComunidadModal } from './ComunidadModal';

export function EquipoModal({ initialTab = 'comunidad', ...props }) {
  return <ComunidadModal initialTab={initialTab} {...props} />;
}
