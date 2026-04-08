import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    // On repasse l'URL de ta base de données ici
    url: "postgresql://postgres:admin@127.0.0.1:5432/apiProjet",
  },
});