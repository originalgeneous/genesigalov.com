import { config, singleton, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Gene Sigalov Site',
    },
    navigation: {
      Content: ['about', 'hero'],
    },
  },
  singletons: {
    about: singleton({
      label: 'About Section',
      path: 'src/content/about',
      schema: {
        paragraph1: fields.text({
          label: 'Paragraph 1',
          multiline: true,
        }),
        paragraph2: fields.text({
          label: 'Paragraph 2',
          multiline: true,
        }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Value' }),
            label: fields.text({ label: 'Label' }),
          }),
          {
            label: 'Stats',
            itemLabel: (props) => props.fields.label.value || 'Stat',
          }
        ),
      },
    }),
    hero: singleton({
      label: 'Hero Section',
      path: 'src/content/hero',
      schema: {
        name: fields.text({ label: 'Name' }),
        tagline: fields.text({ label: 'Tagline' }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
      },
    }),
  },
});
