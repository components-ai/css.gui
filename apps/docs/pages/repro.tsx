import * as React from 'react'
import { Editor, Inputs, styled, codegen, theme } from '@compai/css-gui'
import { Logo } from '@compai/logo'

const initialStyles = {
  fontFamily: 'Recursive',
  fontSize: { value: 16, unit: 'px' },
  lineHeight: { value: 1.5, unit: 'number' },
  textAlign: 'inherit',
  color: '#000',
  backgroundColor: '#fff',
  margin: {
    value: 0,
    unit: 'px',
  },
  height: {
    value: 'auto',
    unit: 'keyword',
  },
  minHeight: {
    value: '0',
    unit: 'px',
  },
  maxHeight: {
    value: 'auto',
    unit: 'keyword',
  },
  width: {
    value: '100',
    unit: '%',
  },
  maxWidth: {
    value: '42',
    unit: 'em',
  },
  borderStyle: 'solid',
  borderWidth: {
    value: 0,
    unit: 'px',
  },
  borderColor: 'transparent',
  borderRadius: {
    value: 0,
    unit: 'px',
  },
  borderImageSlice: {
    value: 1,
    unit: 'number',
  },
  borderImageWidth: {
    value: 64,
    unit: 'px',
  },
  padding: {
    value: 64,
    unit: 'px',
  },
}

export default function Demo() {
  const [styles, setStyles] = React.useState(initialStyles)
  const id = React.useId()

  return (
    <>
      <header sx={{ px: 4, py: 2 }}>
        <a
          href="https://components.ai/open-source/css-gui"
          sx={{
            color: theme.colors.muted,
            textDecoration: 'none',
            fontWeight: 500,
            display: 'flex',
            ':hover': {
              color: theme.colors.primary,
            },
          }}
        >
          <Logo seed={id} sx={{ mr: 2 }} />
          CSS GUI Demo
        </a>
      </header>
      <div
        className="full-bleed"
        sx={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          borderTopWidth: 'thin',
          borderTopStyle: 'solid',
          borderColor: theme.colors.border,
        }}
      >
        <Editor styles={styles} onChange={setStyles} theme={defaultTheme}>
          <div
            sx={{
              display: 'grid',
              gap: '.5rem',
              borderRightWidth: '1px',
              borderRightStyle: 'solid',
              borderColor: 'border',
              p: 4,
            }}
          >
            <h3 sx={{ fontSize: 2, my: 0 }}>Typography</h3>
            <Inputs.FontFamily />
            <Inputs.FontSize />
            <Inputs.LineHeight />
            <Inputs.TextAlign />
            <Inputs.FontStyle />
            <Inputs.FontStretch />
            <h3 sx={{ fontSize: 2, mt: 4, mb: 0 }}>Colors</h3>
            <div sx={{ display: 'flex' }}>
              <div sx={{ mr: 2 }}>
                <Inputs.Color />
              </div>
              <div>
                <Inputs.BackgroundColor />
              </div>
            </div>
            <h3 sx={{ fontSize: 2, mt: 4, mb: 0 }}>Borders</h3>
            <Inputs.BorderRadius />
            <Inputs.BorderWidth />
            <Inputs.BorderStyle />
            <Inputs.BorderColor />
            <Inputs.BorderImageSource />
            <Inputs.BorderImageSlice />
            <Inputs.BorderImageOutset />
            <Inputs.BorderImageRepeat />
            <Inputs.BorderImageWidth />
            <h3 sx={{ fontSize: 2, mt: 4, mb: 0 }}>Spacing</h3>
            <Inputs.Margin />
            <Inputs.Padding />
            <h3 sx={{ fontSize: 2, mt: 4, mb: 0 }}>Size</h3>
            <Inputs.Width />
            <Inputs.MinWidth />
            <Inputs.MaxWidth />
            <Inputs.Height />
            <Inputs.MinHeight />
            <Inputs.MaxHeight />
          </div>
        </Editor>
        <section>
          <styled.p styles={styles}>
            “The parameters comprise sequences which are theoretically infinite
            but limits are, of course, set to them in practice. There is an
            upward limit to size and certainly a downward one... Within these
            sequences there are reasonable bounds; extremes set by technical and
            functional experience”
            <br /> <br />
            <em>
              In{' '}
              <a
                href="https://www.lars-mueller-publishers.com/designing-programmes-0"
                style={{ color: styles.color }}
              >
                Designing Programmes
              </a>{' '}
              by Karl Gerstner
            </em>
          </styled.p>
        </section>
      </div>
      <div className="full-bleed">
        <pre
          sx={{
            p: [2, 3, 5],
            borderTop: 'thin solid',
            borderColor: 'border',
            width: '100%',
            fontSize: 3,
          }}
        >
          {codegen.css(styles)}
        </pre>
      </div>
    </>
  )
}

// https://components.ai/theme/asa9lvO69pQGyRn8ZAXL
export const defaultTheme = {
  space: [
    {
      unit: 'px',
      id: '58d5c0a0-6a75-4392-bfdc-e8dfeeda70ef',
      value: 0,
    },
    {
      id: '974b2e01-3213-4b1f-95b0-f878802cc9ff',
      value: 2,
      unit: 'px',
    },
    {
      unit: 'px',
      value: 4,
      id: 'ecdf306e-3251-4004-9af5-809a6a1038b1',
    },
    {
      id: '83b4c40c-af21-42b7-b9e8-51f2e5340d8f',
      value: 8,
      unit: 'px',
    },
    {
      id: '5faef71c-4826-460d-9da4-ca67dbc3338d',
      unit: 'px',
      value: 16,
    },
    {
      unit: 'px',
      value: 32,
      id: 'e9825590-d1ff-4e07-aec5-d205e69897a9',
    },
    {
      id: '938993bb-27a0-45d0-94e9-d420587acb5e',
      value: 64,
      unit: 'px',
    },
    {
      id: '23b9eb4b-b6c0-4052-8340-0c730e6a413c',
      value: 128,
      unit: 'px',
    },
    {
      unit: 'px',
      value: 256,
      id: '337abd5e-282f-4fcb-b3d9-1001c9e58b51',
    },
    {
      id: '36be9986-a610-41d6-9263-9a713e9f9ee0',
      unit: 'px',
      value: 512,
    },
  ],
  lineHeights: [
    {
      id: 'd7bc4a9b-2d57-4dc2-9452-89f8ae1009e5',
      name: 'solid',
      value: 1,
      unit: 'number',
    },
    {
      value: 1.2,
      id: '8c5d8db3-6126-4ad7-bb8e-80f147fd0694',
      name: 'heading',
      unit: 'number',
    },
    {
      name: 'body',
      value: 1.4,
      id: '77c1d900-f4fc-4f44-bcd7-1f3fa8c3fbd2',
      unit: 'number',
    },
  ],
  borderWidths: [
    {
      id: 'ba623e1e-efb0-4763-9c08-1087d9ff6314',
      unit: 'px',
      value: 1,
    },
    {
      value: 2,
      unit: 'px',
      id: '0c18d989-9abb-4935-8976-8be94b5ce64a',
    },
    {
      unit: 'px',
      id: '4597893f-545e-4b83-bf32-be446b6232e3',
      value: 4,
    },
    {
      value: 8,
      id: '15698313-6770-4fb2-8d36-390f0597b419',
      unit: 'px',
    },
  ],
  fontSizes: [
    {
      id: '8a31d12c-5d8c-421d-a566-5a1b16d9633c',
      unit: 'px',
      value: 12,
    },
    {
      id: '982efd46-1bb5-447e-8e38-ff48170253c4',
      value: 16,
      unit: 'px',
    },
    {
      unit: 'px',
      value: 24,
      id: '97235cbe-e6a3-4f6a-bce9-18b6f5d0b551',
    },
    {
      value: 32,
      unit: 'px',
      id: 'd86f8c8b-1f99-4969-86e8-c28066b3db0d',
    },
    {
      value: 48,
      unit: 'px',
      id: '13729569-4cd7-49f8-aaf9-9f28d632508c',
    },
    {
      value: 64,
      unit: 'px',
      id: '8498c94f-066c-4186-b3aa-3120a15b4921',
    },
    {
      id: '037f7093-27e7-4a7b-b14a-722687d955c0',
      value: 96,
      unit: 'px',
    },
    {
      unit: 'px',
      value: 128,
      id: '98fd3a6e-bc02-4839-be76-2cc9cf7b117f',
    },
    {
      value: 256,
      unit: 'px',
      id: '6c57d38d-fe4e-481c-becd-0f963d2f9885',
    },
  ],
  borderStyles: [],
  fonts: [
    {
      meta: {
        primaryFont: '-apple-system',
        weights: [
          {
            active: false,
            id: 'ceb718ee-f0d0-4aad-8363-68b7e3c952d1',
            weight: '100',
          },
          {
            active: false,
            weight: '200',
            id: 'da2ef064-b0d4-48f1-a07b-453412003d64',
          },
          {
            weight: '300',
            id: '6cf90307-8150-49b6-8825-18978b6fffed',
            active: false,
          },
          {
            weight: '400',
            id: '13bd1b78-6de0-4837-8a35-e223a1f58be2',
            active: false,
          },
          {
            id: '78a808c5-5ebf-4103-b354-bf9ec64d78cb',
            weight: '500',
            active: false,
          },
          {
            weight: '600',
            id: 'caf20cec-d4bb-4a80-8140-3bdf4c3070ca',
            active: false,
          },
          {
            weight: '700',
            id: '6aa934ed-0518-4fc7-a9c5-910db661f92e',
            active: false,
          },
          {
            weight: '800',
            id: 'aa173be6-add9-4add-8b57-1e9b8110ec57',
            active: false,
          },
          {
            id: '93a5138a-b7a4-4c16-8dd1-5c7ca645487c',
            weight: '900',
            active: false,
          },
        ],
      },
      name: 'heading',
      stack:
        "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      id: '70a1e9d0-0311-4164-80cb-c091f10d841f',
    },
    {
      stack:
        "-apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif",
      name: 'body',
      id: 'f237d226-cf79-4045-8c13-9591f68de238',
      meta: {
        weights: [
          {
            id: '56d63179-f2f6-4987-8a85-4ff65b469787',
            active: false,
            weight: '100',
          },
          {
            weight: '200',
            active: false,
            id: '3ceb1359-b3ea-40dd-a364-d5560c93576e',
          },
          {
            weight: '300',
            id: '7fb7abbd-c13f-47ac-8939-725681e1e57d',
            active: false,
          },
          {
            weight: '400',
            active: false,
            id: '75b860fb-bc8b-40d4-95b7-e1c30071d073',
          },
          {
            weight: '500',
            id: 'e0451c68-e9e7-40f7-b621-3394530dbb22',
            active: false,
          },
          {
            id: '282c9d38-035b-4bc7-b196-912dd419001c',
            active: false,
            weight: '600',
          },
          {
            id: '34326a88-b6ed-4b60-8172-10e207f01a3b',
            active: false,
            weight: '700',
          },
          {
            weight: '800',
            id: '7c94f91a-75ec-4586-a41e-76aaf8441feb',
            active: false,
          },
          {
            id: '660e63aa-935a-461e-95e5-550dff750905',
            weight: '900',
            active: false,
          },
        ],
        primaryFont: '-apple-system',
      },
    },
    {
      id: '3b997853-0e0d-42e9-9a70-6000a5963470',
      meta: {
        weights: [
          {
            id: '96d11324-7d14-4671-bc37-5099806b43a5',
            active: false,
            weight: '100',
          },
          {
            weight: '200',
            id: '7a112329-a269-41f0-a209-c2321c316aa3',
            active: false,
          },
          {
            weight: '300',
            active: false,
            id: '2c20a725-77a4-400a-a711-3d8cc29e8b8d',
          },
          {
            id: '26d9bbe4-d472-4bc9-8d1e-1958f492c873',
            weight: '400',
            active: false,
          },
          {
            weight: '500',
            id: '24215864-0fb0-4909-9e25-8e70b75a6244',
            active: false,
          },
          {
            id: 'fadc3efb-bddb-4c8d-8154-794c963ee749',
            weight: '600',
            active: false,
          },
          {
            active: false,
            id: 'bf23b5c9-0f08-4ee0-9f34-4f7a91588520',
            weight: '700',
          },
          {
            weight: '800',
            active: false,
            id: 'b38d3098-5b52-46d2-ae25-4afe4e231dd8',
          },
          {
            id: '4c8e7059-6cf5-4681-9ac5-7ebd3730bb23',
            active: false,
            weight: '900',
          },
        ],
        primaryFont: 'SFMono-Regular',
      },
      stack:
        '"SFMono-Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace',
      name: 'mono',
    },
    {
      id: 'a866c078-4042-4583-94b4-8f28f94a159c',
      name: 'Fenix',
      stack: 'Fenix',
      meta: {
        primaryFont: 'Fenix',
        weights: [
          {
            active: false,
            id: 'c482bed0-d789-49d9-9949-5c8751197fdf',
            weight: '100',
          },
          {
            weight: '200',
            id: 'd27455d4-da9c-47a1-940e-8c321d120706',
            active: false,
          },
          {
            active: false,
            id: '01bee9d4-fb6c-4c02-93aa-680bad91c5dd',
            weight: '300',
          },
          {
            id: 'ac8c58f7-2c15-4a71-8281-ce5f2c1894b5',
            weight: '400',
            active: true,
          },
          {
            active: false,
            id: 'c96fd4f3-bc87-4650-a57c-7f4b192be050',
            weight: '500',
          },
          {
            active: false,
            weight: '600',
            id: '2f14dba8-4432-40e5-8eec-69f1796ffdf6',
          },
          {
            active: false,
            weight: '700',
            id: '512a3a2a-5cb8-4ea3-9a7c-7c1184da2ad0',
          },
          {
            active: false,
            weight: '800',
            id: '42fdcc76-7d57-4ab3-9324-6e28333d56b1',
          },
          {
            weight: '900',
            id: '67a33239-83fc-4c10-8c59-52a914e6cca8',
            active: false,
          },
        ],
      },
    },
    {
      id: 'b390ca43-d5f3-4394-a802-fd366dc9c05c',
      meta: {
        primaryFont: 'Inter',
        weights: [
          {
            id: 'cb067b2e-a25f-4cfb-b16e-34a2333b20c0',
            active: true,
            weight: '100',
          },
          {
            weight: '200',
            active: true,
            id: '97152545-389a-4b6c-9b89-fff51e68c214',
          },
          {
            active: true,
            id: 'fed420fb-290a-477b-8f30-eb6c5a845392',
            weight: '300',
          },
          {
            weight: '400',
            active: true,
            id: '3c10c797-e07d-4b38-9f26-382f91a3eb4a',
          },
          {
            id: '8d9254f5-5a63-4ec8-b21c-77ec0ab8cace',
            weight: '500',
            active: true,
          },
          {
            weight: '600',
            id: '45938ec5-807c-46cf-b2b8-517b0f459e6a',
            active: true,
          },
          {
            id: '8ce95333-9aae-460b-a937-1efbd8d634dd',
            active: true,
            weight: '700',
          },
          {
            id: '55bf06a8-b931-4b8a-96a3-909842da28a0',
            active: true,
            weight: '800',
          },
          {
            weight: '900',
            active: true,
            id: 'e6bd057f-6d7a-473c-b29f-caeac5963dc9',
          },
        ],
      },
      name: 'Inter',
      stack: 'Inter',
    },
  ],
  colors: [
    {
      id: '676f89ae-fae2-431a-8576-bcac2ae60684',
      name: 'gray',
      colors: [
        {
          value: '#000000',
          id: '994f7c8f-aef5-489b-a544-d88a40ceb13d',
        },
        {
          id: 'e378c407-4949-4623-8e6d-46b51b1c801e',
          value: '#1c1c1c',
        },
        {
          value: '#303030',
          id: '85ac4df4-9025-4eaf-ae9d-b552dd63245e',
        },
        {
          id: 'bb5b9e33-0d96-470e-a836-b78a57e0f0b1',
          value: '#474747',
        },
        {
          id: 'e33ef1f2-e24b-4d58-b54a-3326219c8a1b',
          value: '#5d5d5d',
        },
        {
          id: 'ad0a1bff-23cd-44ed-9c62-e366b0bfd4c1',
          value: '#757575',
        },
        {
          value: '#8c8c8c',
          id: 'ea8cac04-081d-454f-ad4d-aae4be5d4683',
        },
        {
          id: '382d108d-a19d-4f3a-8d60-b530493a8ffc',
          value: '#a3a3a3',
        },
        {
          value: '#bababa',
          id: 'be8f6fbe-5ac1-4289-9c50-2e576408e0f1',
        },
        {
          id: '9d6fcc0d-baae-4c5e-8c03-ec0977be7e5d',
          value: '#d1d1d1',
        },
        {
          id: '94918e4c-bd26-4325-b1e1-c1ac34bd55ca',
          value: '#e8e8e8',
        },
        {
          value: '#ffffff',
          id: '01806302-31fc-48d1-aa95-ab59c2019557',
        },
      ],
    },
    {
      colors: [
        {
          id: 'ebc22887-ad18-449e-9dac-74090c4c361a',
          value: '#0e0e11',
        },
        {
          id: 'a14b6760-ce4e-48c8-a0d0-53cb20afe964',
          value: '#21222a',
        },
        {
          id: 'ab087c80-4eed-4f0e-a21c-92aadafa2646',
          value: '#343544',
        },
        {
          value: '#484a5e',
          id: '7f3cf506-f63e-4985-b039-7992f0614fef',
        },
        {
          value: '#5c5f78',
          id: 'd6618749-954b-412e-8fcf-59f3a2147766',
        },
        {
          id: 'd619306e-cbfd-43b8-acc5-5b3c27cdd37b',
          value: '#717490',
        },
        {
          id: '73c8c94f-c738-42c4-9a71-3fd1e1624259',
          value: '#8789a6',
        },
        {
          value: '#9c9eba',
          id: 'fc5bbe63-1a36-431f-8482-a08ea1d8e387',
        },
        {
          id: 'be220929-ef59-4ae8-9d8c-d3cd6aa977d1',
          value: '#b1b3cb',
        },
        {
          id: '88143b5d-f9a4-4311-8db6-82f7cb3462bf',
          value: '#c6c8db',
        },
        {
          value: '#dcdce9',
          id: '6c414d57-6aff-4759-a05a-5884082cc853',
        },
        {
          id: 'dbab9712-54e3-4923-8d37-8167f3c6a604',
          value: '#f1f1f6',
        },
      ],
      name: 'blueGray',
      id: 'ede541e8-f47a-49a1-986c-e94561f5ab6e',
    },
    {
      colors: [
        {
          id: '22951c33-c96b-4e31-ba3a-018ebc86ebb0',
          value: '#0d0e1a',
        },
        {
          value: '#182142',
          id: '32ecb274-dc20-48e7-8122-73d825b85bde',
        },
        {
          id: 'add83b2e-d6b4-4452-bbc3-218bf3a9d83a',
          value: '#1e336d',
        },
        {
          id: 'df432569-9c0d-4a2e-9d52-13be85f44ffa',
          value: '#254797',
        },
        {
          id: '55863c15-36b1-4ce0-851c-03d69442aa28',
          value: '#325bbd',
        },
        {
          id: 'b06e4108-57be-4313-b0c1-4fb957979762',
          value: '#476fde',
        },
        {
          id: 'c0ae9fcc-922b-4dd3-aca5-444f0f76b9e8',
          value: '#6284f6',
        },
        {
          id: '5c519758-18eb-449f-a7d9-41ff2b4572de',
          value: '#809aff',
        },
        {
          value: '#9fb0ff',
          id: '00087aae-03bb-4df5-9371-5c5fdcdc01a6',
        },
        {
          value: '#bcc6ff',
          id: 'd521c703-de49-4d93-b452-f379eef24677',
        },
        {
          value: '#d9deff',
          id: '33e7b08d-1c36-444a-a285-98a040859e21',
        },
        {
          value: '#f4f5ff',
          id: '82716009-7f2f-463e-a956-614fe2909494',
        },
      ],
      id: 'faf999a6-b94b-49d9-9d76-849c1f27405a',
      name: 'blue',
    },
    {
      id: '46099834-dc24-4836-b6bb-694af3484f81',
      name: 'indigo',
      colors: [
        {
          value: '#120c1d',
          id: '5fa282c2-583d-4452-9877-c90d1ea6c7ca',
        },
        {
          id: 'a508ddc5-3e98-4eb3-ab2c-202b03e6ac45',
          value: '#211b4d',
        },
        {
          value: '#2f297f',
          id: '42b92b7c-1279-4fca-930e-50851539dd20',
        },
        {
          id: '89c53ffb-4c04-44f5-9a46-fcf30dd05703',
          value: '#3e38b0',
        },
        {
          value: '#5049dd',
          id: '2b188162-6854-4bd9-8250-5f05c396bf50',
        },
        {
          value: '#675bff',
          id: 'ec8f3796-51fc-4774-b834-e584579dba30',
        },
        {
          id: 'd35fc8e8-f557-4fad-b9cb-181ad1a3b671',
          value: '#8170ff',
        },
        {
          id: '042ba1cc-1f16-4916-a819-c86658028bc3',
          value: '#9d87ff',
        },
        {
          id: '3cbd0c05-fde7-481b-9816-3776434c6a24',
          value: '#b7a0ff',
        },
        {
          id: 'f9a64b57-c430-4ded-a80e-1b5e4187411b',
          value: '#d0baff',
        },
        {
          value: '#e5d6ff',
          id: '4b35430f-f4a8-4386-958c-14139efdea89',
        },
        {
          value: '#f7f1ff',
          id: 'c4db62f0-6aac-4aa5-a93f-bce970e4c648',
        },
      ],
    },
    {
      name: 'violet',
      colors: [
        {
          id: '21e2165c-e503-4a31-96e0-bf2e55ef439b',
          value: '#170a1b',
        },
        {
          id: '3ee72903-29dc-4d83-b78c-013b4908279b',
          value: '#321545',
        },
        {
          value: '#501b71',
          id: '254178dd-c278-42d8-ba9d-9264b23e2299',
        },
        {
          id: '1527bf46-5fd3-4ca4-9358-660a285aa963',
          value: '#6d239d',
        },
        {
          id: 'd20756fb-c78f-4a43-835b-d8be92f411f4',
          value: '#8a2fc5',
        },
        {
          value: '#a641e7',
          id: 'f8327841-cb8f-4113-81ab-739b79652636',
        },
        {
          value: '#be58ff',
          id: '0e245f0d-5d12-44c3-9098-ec93c2ca9c62',
        },
        {
          value: '#d374ff',
          id: '9a31e914-5eee-41a9-bf7f-c1cb03f2b50d',
        },
        {
          id: 'a7e693a4-8aa4-48f2-8143-d7d4b0c4e4d0',
          value: '#e392ff',
        },
        {
          value: '#f0b1ff',
          id: 'b219c525-70bd-4b3d-929a-b447754a2fe6',
        },
        {
          value: '#f9d0ff',
          id: 'd24fd0b2-0fde-4b13-b360-fa0c2bf01fb4',
        },
        {
          value: '#fef0ff',
          id: '423ecf33-a980-487a-9428-48af043491cc',
        },
      ],
      id: '976722da-7882-4e0c-90fd-9dd4c1162057',
    },
    {
      id: '537d5e87-dd99-4210-bed9-af732d4d15b1',
      colors: [
        {
          id: '1b474ed6-b774-4339-a237-777884a9cb68',
          value: '#170915',
        },
        {
          value: '#381436',
          id: '333ac691-622c-418d-aff9-061b032270d5',
        },
        {
          id: '72bfde86-7b1f-4a31-b5c6-26921a35bea7',
          value: '#5b1859',
        },
        {
          value: '#7f1e7c',
          id: 'd7d8cd1c-f22a-455a-812b-c17a8004d9dc',
        },
        {
          id: '9f1a8f1f-02d1-4193-9b27-52b83d35eddd',
          value: '#a0289d',
        },
        {
          value: '#bf3abb',
          id: '26eb724e-fde5-47f8-8079-20cae82af85e',
        },
        {
          value: '#d853d2',
          id: '4c16844b-6727-4fdd-a3aa-b5b2fa2c8c1b',
        },
        {
          value: '#ea70e4',
          id: '536d5e5b-dfd0-47a2-96d1-118cf6608260',
        },
        {
          id: '6d47122e-d3e0-4d1a-8e05-1a0d81e4c723',
          value: '#f78ff0',
        },
        {
          value: '#ffaef8',
          id: 'd36cac2a-aa79-489c-ab77-b5477ac7826b',
        },
        {
          id: '84057845-db4b-4760-a067-50684320b38e',
          value: '#ffcefc',
        },
        {
          value: '#ffeefe',
          id: '74cd8468-6fe0-43e0-889d-46b621bc2c83',
        },
      ],
      name: 'magenta',
    },
    {
      name: 'red',
      id: 'bf8f1a8f-fcaf-4bdd-a22a-1bac8a3c5956',
      colors: [
        {
          id: '6657684c-b22c-420c-b93e-0536532cc2b9',
          value: '#19090a',
        },
        {
          id: '81e22113-dde3-453f-861d-6e7a854b1fc5',
          value: '#3e131a',
        },
        {
          id: 'c919f6bb-b52f-4910-90fd-0f8788e09fcd',
          value: '#651829',
        },
        {
          value: '#8d1d38',
          id: 'c88e73af-9897-4ad9-a781-a10802ce1bf8',
        },
        {
          value: '#b22749',
          id: '5ecec09b-9b68-4773-a5f0-203ed38f28fd',
        },
        {
          id: '64e7ed64-d29b-4edf-98c1-651cd35dee75',
          value: '#d23a5b',
        },
        {
          id: '278faedc-4f31-458f-b045-eb0e666c972b',
          value: '#ec5370',
        },
        {
          id: '91abfadb-c46f-4bb7-9f6f-d79d6e806d57',
          value: '#ff7086',
        },
        {
          id: '6a493b21-6b82-477c-885e-85fa6798152f',
          value: '#ff909e',
        },
        {
          id: 'ae728c4c-0db2-4213-8475-29967d269b1d',
          value: '#ffb0b9',
        },
        {
          value: '#ffd0d4',
          id: '35465458-b911-40b4-9a44-4547b9f27d2c',
        },
        {
          value: '#fff0f1',
          id: '74fe8217-e90c-4548-a952-963d5615d04d',
        },
      ],
    },
    {
      colors: [
        {
          value: '#200d02',
          id: '62de84dc-8b55-4d21-a907-df2b7e648972',
        },
        {
          id: '0e44d39a-d7cd-4717-b79d-1d8847b588e3',
          value: '#431706',
        },
        {
          value: '#691e0a',
          id: '01fc4564-a995-4536-898d-ed15b96ae4da',
        },
        {
          value: '#8e280d',
          id: '8071d43e-7c2c-4eb2-80ca-1492068dac19',
        },
        {
          id: '56f73d5b-ea15-4226-8848-f7253b9d3d1b',
          value: '#b13514',
        },
        {
          value: '#d14721',
          id: '659fbf48-0845-47e1-8d02-9577ea410281',
        },
        {
          value: '#ea5e36',
          id: 'bf9d17d5-4b0d-4ad4-9056-fa6286d16244',
        },
        {
          id: '2f229011-4cb3-4c1d-9993-882338eb37df',
          value: '#fd7950',
        },
        {
          id: '1297d1de-4ac1-4d90-a452-a887699a854d',
          value: '#ff9670',
        },
        {
          id: '3ce7b3eb-dc76-4cfc-b1cb-b869fc8153f1',
          value: '#ffb495',
        },
        {
          id: '6e7d0c64-724d-4ad2-84c7-458602db0077',
          value: '#ffd2be',
        },
        {
          id: '1c729b9f-2c09-4098-90da-c07fc4dd6fda',
          value: '#fff0e9',
        },
      ],
      name: 'orange',
      id: '4d5c2c0a-1782-4c74-a549-9437ea09e472',
    },
    {
      colors: [
        {
          id: 'fa181129-4e85-4b2e-a12e-3283fa4154e8',
          value: '#160f05',
        },
        {
          id: '79c72fba-0af8-4950-8210-13889bd6a8e0',
          value: '#402e11',
        },
        {
          value: '#6e4d14',
          id: 'c2ad3cfa-0116-4e61-94a9-f0256f44c22b',
        },
        {
          id: '0f352443-fbfd-42eb-96dd-79e462b99eb3',
          value: '#9c6c18',
        },
        {
          id: 'c1325599-ce71-452b-b102-b630f9879fb4',
          value: '#c68a20',
        },
        {
          id: '8712e418-d874-4c11-ad4d-a7d0d4cede86',
          value: '#eba62e',
        },
        {
          id: 'bbc049ae-60ec-4649-8e11-147aba4e7c99',
          value: '#ffbe44',
        },
        {
          value: '#ffd15e',
          id: '35b05e85-ec88-41e4-b74a-33b9d6457114',
        },
        {
          value: '#ffe07c',
          id: '3b736565-e325-4acc-8c58-f6065ef5c8ba',
        },
        {
          id: '8404df34-3da1-45c0-ad35-fc92b83926b2',
          value: '#ffeb9b',
        },
        {
          id: '7ec762d1-33e3-4e58-9a91-3d7a8df98f2c',
          value: '#fff3bc',
        },
        {
          value: '#fffade',
          id: '0462ddb0-1538-43d9-90a3-cc11e0177dc7',
        },
      ],
      name: 'gold',
      id: '09a65ee0-c8d9-4983-8f11-bb91a43fd423',
    },
    {
      colors: [
        {
          id: 'fef27661-9135-4e7d-86ab-17520d665b54',
          value: '#0d0c04',
        },
        {
          value: '#332f11',
          id: '47a73e4a-fb2c-4c69-aefe-1f096e5805a0',
        },
        {
          value: '#585315',
          id: 'e6a22935-c247-4114-838e-2524e449a60d',
        },
        {
          value: '#7f7719',
          id: 'fa29b2e4-199c-4ac1-a9d0-372dc2606ad3',
        },
        {
          id: '9103bab7-b07e-4265-ad7d-9a7edac95559',
          value: '#a49a20',
        },
        {
          id: '037029c3-aba5-4363-970c-d9a3bc3ec76e',
          value: '#c5ba2c',
        },
        {
          id: 'e202afb8-cb2e-4b01-97ec-ff81530b0bba',
          value: '#e1d43f',
        },
        {
          id: 'd62cb6e7-1212-453d-ab08-11286ae7da77',
          value: '#f6e857',
        },
        {
          value: '#fff673',
          id: '709802e6-310a-43db-953a-33bc10d9f556',
        },
        {
          value: '#fffe90',
          id: 'c8dd03cb-5642-4ef2-b7f1-4ba882c79239',
        },
        {
          id: '548dac3d-1d4b-43a8-ad1e-9d4b476f7bd2',
          value: '#ffffae',
        },
        {
          id: '7689ec0d-4c8f-47a4-af4a-bb30789a8231',
          value: '#ffffcc',
        },
      ],
      id: '1176151b-839e-425c-9e49-cab3b85b6ae2',
      name: 'yellow',
    },
    {
      id: 'b972212e-9a08-4944-9660-a9576fbbf288',
      colors: [
        {
          id: '210da771-db2e-4a69-9050-d93dbc6cf8b4',
          value: '#161708',
        },
        {
          id: '16d94297-1828-4563-b44f-061d2aa8b31f',
          value: '#323711',
        },
        {
          id: 'ab5bbf28-8895-4cae-8e49-c48c9933b966',
          value: '#505a15',
        },
        {
          id: '5adaf95e-0a94-459a-b1c5-6142f77009ff',
          value: '#6e7c19',
        },
        {
          value: '#8b9c22',
          id: '40130f30-6f4d-45eb-971c-dcfab284942f',
        },
        {
          value: '#a6b932',
          id: '6b72830d-c3eb-4b5a-a22a-61bb0254d48b',
        },
        {
          id: '141ce1b7-35f3-4efe-9f87-3a94b8eefd77',
          value: '#bed049',
        },
        {
          value: '#d1e264',
          id: 'fa5b7910-2496-4221-8abd-9f0155d6c7da',
        },
        {
          value: '#e1ee83',
          id: 'dc154a93-646e-4bfc-a163-3a9a8111311c',
        },
        {
          value: '#edf6a3',
          id: '7eae4872-7d2a-4c01-a0d3-81d4fac0faab',
        },
        {
          id: '6fbaa168-763a-4768-9a93-a072cdfbd38b',
          value: '#f6fbc4',
        },
        {
          id: 'e9dc8a9d-b5ff-4808-94ab-6005d9c576e3',
          value: '#fcfee6',
        },
      ],
      name: 'lime',
    },
    {
      id: 'b94db715-3882-474f-a890-c88aac4a1534',
      name: 'green',
      colors: [
        {
          value: '#071209',
          id: '4e9f3f19-f0f3-49c2-9c63-a93956e25f35',
        },
        {
          value: '#102816',
          id: 'ef6f06e7-0d90-4bd5-a770-dbc5f9346848',
        },
        {
          id: 'c788fc76-c704-48a0-8cb9-9b3c161affdd',
          value: '#133f21',
        },
        {
          id: 'febeecb1-48fd-4789-9a00-a45a86e8caaf',
          value: '#18572d',
        },
        {
          id: 'b8a18152-01d3-432a-9961-bdfa0b9ceeef',
          value: '#216f3b',
        },
        {
          value: '#32864b',
          id: '788ba587-643c-42a8-9d13-ec1719c95733',
        },
        {
          value: '#499c60',
          id: '05c5b798-4cc9-456b-aec0-20144f444369',
        },
        {
          id: 'd51bad40-05b0-4188-9e5e-c07e002e27b6',
          value: '#66b178',
        },
        {
          id: '6073c2ef-28cf-4f69-aba0-a2d69cc6c17f',
          value: '#85c492',
        },
        {
          value: '#a7d6af',
          id: 'b85c1013-2265-4ae4-a595-1c608f4e627d',
        },
        {
          id: '05d744ab-2a0c-4425-b1ac-d726df3227e7',
          value: '#cae7cf',
        },
        {
          value: '#eef7ef',
          id: '34e2d535-845d-4bce-bd47-3dd5bb11da26',
        },
      ],
    },
    {
      id: '972ef60e-e7aa-484b-b651-4ab19659099c',
      colors: [
        {
          id: '4c15e14a-0803-4101-931f-3d501b7b3aba',
          value: '#07110f',
        },
        {
          id: '30486ca0-3607-4dd6-b381-8615ee631450',
          value: '#102722',
        },
        {
          value: '#133d35',
          id: '607dcf2c-18b6-4800-a916-cf0cf8f44836',
        },
        {
          id: '2308379d-543b-4a60-8239-b5247306c294',
          value: '#18544a',
        },
        {
          value: '#216b5e',
          id: '43884516-f64d-4448-94cf-e5ce7690a05c',
        },
        {
          id: 'a6c56f5f-e506-492f-9a87-bf07a77f547d',
          value: '#328173',
        },
        {
          id: '59639620-0d23-4db5-8c29-c02fc9b91709',
          value: '#499789',
        },
        {
          id: '48058a9f-0148-41fc-b9f0-e3e820683277',
          value: '#65ac9e',
        },
        {
          value: '#85c0b3',
          id: 'e67295e1-9860-4173-8534-274efa611930',
        },
        {
          value: '#a7d3c9',
          id: '26e4af86-28ec-4e55-a4a5-593651a28362',
        },
        {
          id: '63aa7c56-d270-472e-a80b-5ab1d06d813c',
          value: '#cae5de',
        },
        {
          id: 'd2a4fb79-f99b-4eca-95c5-67d702681f79',
          value: '#eef7f4',
        },
      ],
      name: 'teal',
    },
    {
      colors: [
        {
          value: '#081111',
          id: '66a2f872-37ea-44fa-927a-a0aa88c554f0',
        },
        {
          value: '#112627',
          id: 'fa0313ed-4236-41f2-8797-19e5a1a06c01',
        },
        {
          id: '5748eac7-d905-4cfa-a1e9-2b3f867b03a3',
          value: '#143c3e',
        },
        {
          id: 'da91f19d-71d2-42a4-b69b-8c7fcb145e6e',
          value: '#185356',
        },
        {
          value: '#226a6d',
          id: 'a464fe50-17ea-4731-8b17-2c89ec1eaf3d',
        },
        {
          value: '#338084',
          id: 'a7503d87-4919-47cb-bdbf-4b1fbf334d79',
        },
        {
          id: '6bff1c61-8a6e-416f-b9a8-e662573aec1c',
          value: '#4b969a',
        },
        {
          value: '#67abae',
          id: 'cffdc97b-794a-40b8-b320-9729e6468df7',
        },
        {
          value: '#87bfc1',
          id: 'eae73c5a-37dc-44ef-857d-d0da7e72bf49',
        },
        {
          id: '8b7c24a0-08e5-4981-9bd8-0ba211499c4d',
          value: '#a8d2d4',
        },
        {
          id: '987fa1b0-0dd9-4f57-af88-fcb8b6b61016',
          value: '#cbe4e5',
        },
        {
          id: '62682a6a-1b54-4262-a5db-6bc714d00ace',
          value: '#eef6f7',
        },
      ],
      id: '795d336e-6e9b-4510-b3a8-4f85230a75c4',
      name: 'cyan',
    },
  ],
  text: [
    {
      name: 'heading',
      id: '81522f2c-555a-4080-8f74-4c3ed90cff30',
      styles: [
        {
          value: 'body',
          aliasId: 'f237d226-cf79-4045-8c13-9591f68de238',
          id: '4330b346-a5c9-445b-be3c-07c5282350b1',
          name: 'fontFamily',
        },
        {
          value: 700,
          name: 'fontWeight',
          id: '33014b4a-6ab4-4939-b9da-b2b45a9f921c',
        },
        {
          aliasId: 'd7bc4a9b-2d57-4dc2-9452-89f8ae1009e5',
          unit: 'raw',
          value: 1,
          name: 'lineHeight',
          id: 'fcf9c66b-d7de-450f-b64f-07f633ad4aaa',
        },
        {
          aliasId: '48c0dff6-0ba7-49f1-9961-8d78b43893d7',
          name: 'letterSpacing',
          unit: 'raw',
          value: 2,
          id: '647bbc4e-9bc8-4c03-8634-719253128616',
        },
        {
          value: 1,
          unit: 'raw',
          aliasId: '982efd46-1bb5-447e-8e38-ff48170253c4',
          name: 'fontSize',
          id: 'e09f4822-c782-4dd0-81e4-876fabd6c2ee',
        },
      ],
    },
  ],
  borderRadius: [
    {
      value: 0,
      unit: 'px',
      id: 'd3a18eec-caa5-4820-a38b-be1f965fd2f4',
    },
    {
      value: 4,
      unit: 'px',
      id: 'ba1db5fd-7072-42aa-9a13-d191334ae84a',
    },
    {
      unit: 'px',
      value: 8,
      id: '570a2b2a-7418-44ec-b8cb-5d46927a713f',
    },
    {
      unit: 'px',
      id: '17acdfc2-32d3-4114-bfb4-562987fbd2b6',
      value: 16,
    },
    {
      value: 32,
      unit: 'px',
      id: '980bf6c0-c74c-497b-b6c6-9101e47c1c08',
    },
    {
      value: 64,
      unit: 'px',
      id: '62de8f22-203a-40f1-a152-4a2c26c57e86',
    },
    {
      value: 9999999,
      id: '9bc38b2b-dec8-4947-8137-fbbec8f5f219',
      unit: 'px',
    },
  ],
  letterSpacings: [
    {
      id: '0186ef74-ee18-46bf-adc1-53866c3ef91b',
      value: 0.1,
      unit: 'em',
      name: 'tracked',
    },
    {
      id: '33e0203c-1c02-44d7-b484-c749b9bfc283',
      name: 'negative',
      unit: 'em',
      value: -0.05,
    },
    {
      value: 0.25,
      id: '48c0dff6-0ba7-49f1-9961-8d78b43893d7',
      name: 'large',
      unit: 'em',
    },
  ],
}
