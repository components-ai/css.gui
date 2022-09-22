export const initialValue: any = {
  tagName: 'div',
  style: {
    paddingTop: {
      value: 128,
      unit: 'px',
    },
    paddingBottom: {
      value: 128,
      unit: 'px',
    },
  },
  children: [
    {
      tagName: 'header',
      style: {
        paddingLeft: {
          value: 64,
          unit: 'px',
        },
        paddingRight: {
          value: 64,
          unit: 'px',
        },
      },
      children: [
        {
          tagName: 'h1',
          attributes: {},
          style: {
            color: '#4e4fec',
            fontSize: {
              type: 'responsive',
              values: [
                {
                  value: 4,
                  unit: 'rem',
                },
                {
                  value: 6,
                  unit: 'rem',
                },
                {
                  value: 10,
                  unit: 'rem',
                },
              ],
            },
            fontWeight: '900',
            fontFamily: 'Inter',
            letterSpacing: { value: -8, unit: 'px' },
            marginTop: {
              value: 0,
              unit: 'px',
            },
            marginBottom: {
              value: 0,
              unit: 'px',
            },
            lineHeight: {
              value: 1.25,
              unit: 'number',
            },
          },
          children: [{ type: 'text', value: 'CSS.GUI' }],
        },
        {
          tagName: 'h2',
          attributes: {},
          style: {
            marginBottom: {
              value: 0,
              unit: 'px',
            },
            fontSize: {
              value: 48,
              unit: 'px',
            },
            maxWidth: {
              value: 40,
              unit: 'em',
            },
            lineHeight: {
              value: 1.25,
              unit: 'number',
            },
          },
          children: [
            {
              type: 'text',
              value:
                'Quickly build components with custom styling panels. No coding required.',
            },
          ],
        },
        {
          tagName: 'p',
          style: {
            marginBottom: {
              value: 96,
              unit: 'px',
            },
            fontSize: {
              value: 20,
              unit: 'px',
            },
            maxWidth: {
              value: 40,
              unit: 'em',
            },
          },
          children: [
            {
              type: 'text',
              value:
                'Click anywhere on the canvas to start. Go ahead. Click away.',
            },
          ],
        },
      ],
    },
    {
      tagName: 'section',
      style: {
        borderTopWidth: { value: 1, unit: 'px' },
        borderTopStyle: 'solid',
        borderTopColor: { type: 'theme', path: 'border' },
        marginTop: { value: 128, unit: 'px' },
        paddingTop: { value: 128, unit: 'px' },
        paddingBottom: { value: 128, unit: 'px' },
        paddingLeft: { value: 64, unit: 'px' },
        paddingRight: { value: 64, unit: 'px' },
        display: 'grid',
        gap: [{ value: 2, unit: 'em' }],
        justifyContent: 'space-between',
        gridTemplateColumns: [
          {
            name: 'repeat',
            arguments: {
              count: 4,
              trackList: [{ value: 1, unit: 'fr' }],
            },
          },
        ],
        boxSizing: 'border-box',
      },
      children: [
        {
          tagName: 'img',
          attributes: {
            src: 'https://source.unsplash.com/random/1920x1280',
            title: 'Image - <img />',
          },
          style: {
            display: 'block',
            width: { value: 100, unit: '%' },
            maxWidth: { value: 100, unit: '%' },
            height: 'auto',
            borderRadius: { value: 0, unit: 'px' },
            mixBlendMode: 'normal',
          },
        },
        {
          tagName: 'video',
          attributes: {
            title: 'Video - <video>',
            src: 'https://dc28c2r6oodom.cloudfront.net/vid/cube-loop.mp4',
            loop: true,
            autoPlay: true,
            playsInline: true,
          },
          style: {
            width: { value: 100, unit: '%' },
            borderRadius: { value: 0, unit: 'px' },
          },
        },
        // TODO
        //{
        //  tagName: 'audio',
        //  attributes: {
        //    src: 'https
        //  }
        //},
        {
          tagName: 'div',
          children: [{ type: 'text', value: '' }],
          style: {
            color: '#000000',
            backgroundImage: [
              {
                name: 'linear-gradient',
                arguments: {
                  angle: { value: 45, unit: 'deg' },
                  stops: [
                    { color: '#ff33cc', hinting: 0 },
                    { color: '#ffcc33', hinting: 100 },
                  ],
                },
              },
            ],
            borderRadius: {
              value: 16,
              unit: 'px',
            },
            mixBlendMode: 'normal',
            backgroundBlendMode: ['overlay'],
            transition: [
              {
                timingFunction: {
                  type: 'cubic-bezier',
                  p1: 0,
                  p2: 0,
                  p3: 1,
                  p4: 1,
                },
                property: 'all',
                duration: { value: 250, unit: 'ms' },
                delay: { value: 0, unit: 'ms' },
              },
            ],
            ':hover': {
              borderRadius: { value: 4, unit: 'px' },
            },
          },
        },
        {
          tagName: 'div',
          children: [
            {
              tagName: 'p',
              attributes: { title: 'Paragraph: <p>' },
              style: {
                color: { type: 'theme', path: 'text' },
                backgroundColor: { type: 'theme', path: 'background' },
                fontSize: { value: 1, unit: 'em' },
                fontFamily: 'Inter',
                marginTop: { value: 0, unit: 'px' },
                marginBottom: { value: 1.5, unit: 'em' },
                lineHeight: {
                  value: 1.5,
                  unit: 'number',
                },
                maxWidth: {
                  value: 40,
                  unit: 'em',
                },
              },
              children: [
                {
                  type: 'text',
                  value:
                    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
                },
              ],
            },
            //  {
            //    tagName: 'p',
            //    attributes: {  title: 'Paragraph: <p>' },
            //    style: {
            //      color: { type: 'theme', path: 'text' },
            //      backgroundColor: { type: 'theme', path: 'background' },
            //      fontSize: { value: 1, unit: 'em', },
            //      fontFamily: 'Inter',
            //      marginTop: { value: 0, unit: 'px' },
            //      marginBottom: { value: 0, unit: 'px' },
            //      lineHeight: {
            //        value: 1.5, unit: 'number',
            //      },
            //      maxWidth: {
            //        value: 40,
            //        unit: 'em',
            //      },
            //    },
            //    children: [
            //      { type: 'text', value: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'  }
            //    ]
            //  },
          ],
        },
        {
          tagName: 'label',
          attributes: { title: 'Label: <label>' },
          children: [{ type: 'text', value: 'Form label' }],
        },
        {
          tagName: 'input',
          style: {
            appearance: 'none',
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
            height: 'auto',
          },
          attributes: {
            type: 'text',
            placeholder: 'Placeholder text',
            title: 'Text input: <input type="text" />',
          },
        },
        {
          tagName: 'input',
          style: {
            appearance: 'none',
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'password',
            placeholder: 'Password',
            title: 'Password input: <input type="password" />',
          },
        },
        {
          tagName: 'input',
          style: {
            appearance: 'none',
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'email',
            value: 'email@example.com',
          },
        },
        {
          tagName: 'input',
          attributes: {
            type: 'color',
            defaultValue: '#ff33cc',
          },
        },
        {
          tagName: 'input',
          style: {
            appearance: 'none',
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'date',
          },
        },
        {
          tagName: 'input',
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 0.75, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'file',
          },
        },
        {
          tagName: 'input',
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'number',
            defaultValue: 32,
            min: -100,
            max: 100,
          },
        },
        {
          tagName: 'input',
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'month',
            defaultValue: '2048-02',
          },
        },
        {
          tagName: 'input',
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'week',
            defaultValue: '2048-W32',
          },
        },
        {
          tagName: 'input',
          style: {
            accentColor: '#6465ff',
          },
          attributes: {
            type: 'range',
          },
        },
        {
          tagName: 'input',
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'search',
          },
        },
        {
          tagName: 'input',
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'tel',
          },
        },
        {
          tagName: 'input',
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 0.5, unit: 'rem' },
              bottom: { value: 0.5, unit: 'rem' },
              left: { value: 0.5, unit: 'rem' },
              right: { value: 0.5, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          attributes: {
            type: 'url',
            defaultValue: 'https://components.ai',
          },
        },
        {
          tagName: 'div',
          children: [
            {
              tagName: 'input',
              style: {
                accentColor: '#6465ff',
              },
              attributes: {
                type: 'checkbox',
                defaultChecked: true,
              },
            },
            {
              tagName: 'input',
              style: {
                accentColor: '#6465ff',
              },
              attributes: {
                type: 'checkbox',
                defaultChecked: false,
              },
            },
          ],
        },
        {
          tagName: 'div',
          children: [
            {
              tagName: 'input',
              style: {
                accentColor: '#6465ff',
              },
              attributes: {
                type: 'radio',
                defaultChecked: true,
                name: 'boolean',
              },
            },
            {
              tagName: 'input',
              style: {
                accentColor: '#6465ff',
              },
              attributes: {
                type: 'radio',
                name: 'boolean',
              },
            },
          ],
        },
        {
          tagName: 'input',
          style: {
            cursor: 'pointer',
            color: '#6465ff',
            backgroundColor: '#f7f1ff',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: '600',
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px' },
            appearance: 'none',
            boxShadow: [
              {
                inset: false,
                spread: { value: 0, unit: 'px' },
                blur: { value: 0, unit: 'px' },
                offsetX: { value: 0, unit: 'px' },
                offsetY: { value: 0, unit: 'px' },
                color: 'transparent',
              },
            ],
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            borderWidth: { top: { value: 0, unit: 'px' } },
            borderColor: {
              top: 'transparent',
              bottom: 'transparent',
              left: 'transparent',
              right: 'transparent',
            },
            transition: [
              {
                property: 'all',
                duration: { value: 0.2, unit: 's' },
                delay: { value: 0, unit: 's' },
                timingFunction: {
                  type: 'cubic-bezier',
                  p1: 0.42,
                  p2: 0.0,
                  p3: 0.58,
                  p4: 1.0,
                },
              },
            ],
            ':hover': {
              color: '#4041c2',
            },
          },
          attributes: {
            type: 'submit',
          },
        },
        {
          tagName: 'button',
          style: {
            cursor: 'pointer',
            color: '#fff',
            backgroundColor: '#6465ff',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: '600',
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px' },
            appearance: 'none',
            borderWidth: { top: { value: 0, unit: 'px' } },
            borderColor: { top: 'transparent' },
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            transition: [
              {
                timingFunction: {
                  type: 'cubic-bezier',
                  p1: 0,
                  p2: 0,
                  p3: 1,
                  p4: 1,
                },
                property: 'all',
                duration: { value: 250, unit: 'ms' },
                delay: { value: 0, unit: 'ms' },
              },
            ],
            ':hover': {
              backgroundColor: '#4041c2',
            },
          },
          children: [{ type: 'text', value: 'Primary Button' }],
        },
        {
          tagName: 'button',
          style: {
            cursor: 'pointer',
            color: '#6465ff',
            backgroundColor: 'transparent',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: '600',
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px' },
            appearance: 'none',
            boxShadow: [
              {
                inset: true,
                spread: { value: 2, unit: 'px' },
                blur: { value: 0, unit: 'px' },
                offsetX: { value: 0, unit: 'px' },
                offsetY: { value: 0, unit: 'px' },
                color: 'currentcolor',
              },
            ],
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            borderWidth: { top: { value: 0, unit: 'px' } },
            borderColor: {
              top: 'transparent',
              bottom: 'transparent',
              left: 'transparent',
              right: 'transparent',
            },
            transition: [
              {
                timingFunction: {
                  type: 'cubic-bezier',
                  p1: 0,
                  p2: 0,
                  p3: 1,
                  p4: 1,
                },
                property: 'all',
                duration: { value: 250, unit: 'ms' },
                delay: { value: 0, unit: 'ms' },
              },
            ],
            ':hover': {
              color: { type: 'theme', path: 'text' },
            },
          },
          children: [{ type: 'text', value: 'Button Outline' }],
        },
        {
          tagName: 'input',
          style: {
            cursor: 'pointer',
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            fontSize: { value: 1, unit: 'rem' },
            fontWeight: '600',
            borderRadius: { value: 6, unit: 'px' },
            paddingTop: { value: 16, unit: 'px' },
            paddingBottom: { value: 16, unit: 'px' },
            paddingLeft: { value: 64, unit: 'px' },
            paddingRight: { value: 64, unit: 'px' },
            appearance: 'none',
            boxShadow: [
              {
                inset: true,
                spread: { value: 2, unit: 'px' },
                blur: { value: 0, unit: 'px' },
                offsetX: { value: 0, unit: 'px' },
                offsetY: { value: 0, unit: 'px' },
                color: 'currentcolor',
              },
            ],
            borderStyle: {
              top: 'none',
              bottom: 'none',
              left: 'none',
              right: 'none',
            },
            borderWidth: { top: { value: 0, unit: 'px' } },
            borderColor: {
              top: 'transparent',
              bottom: 'transparent',
              left: 'transparent',
              right: 'transparent',
            },
            transition: [
              {
                timingFunction: {
                  type: 'cubic-bezier',
                  p1: 0,
                  p2: 0,
                  p3: 1,
                  p4: 1,
                },
                property: 'all',
                duration: { value: 250, unit: 'ms' },
                delay: { value: 0, unit: 'ms' },
              },
            ],
            ':hover': {
              color: '#4e4fec',
            },
          },
          attributes: {
            type: 'button',
            defaultValue: 'Button input',
          },
        },
        {
          tagName: 'progress',
          style: {
            accentColor: '#6465ff',
            height: { value: 48, unit: 'px' },
          },
          attributes: { max: 100, value: 61.8 },
        },
        {
          tagName: 'textarea',
          attributes: {
            rows: 8,
          },
          style: {
            appearance: 'none',
            color: { type: 'theme', path: 'text' },
            backgroundColor: 'transparent',
            borderWidth: {
              top: { value: 1, unit: 'px' },
              bottom: { value: 1, unit: 'px' },
              left: { value: 1, unit: 'px' },
              right: { value: 1, unit: 'px' },
            },
            borderColor: {
              top: 'currentcolor',
              bottom: 'currentcolor',
              left: 'currentcolor',
              right: 'currentcolor',
            },
            borderStyle: {
              top: 'solid',
              bottom: 'solid',
              left: 'solid',
              right: 'solid',
            },
            fontSize: { value: 1, unit: 'rem' },
            padding: {
              top: { value: 1, unit: 'rem' },
              bottom: { value: 1, unit: 'rem' },
              left: { value: 1, unit: 'rem' },
              right: { value: 1, unit: 'rem' },
            },
            borderRadius: { value: 0, unit: 'px' },
          },
          children: [
            {
              type: 'text',
              value:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            },
          ],
        },
        {
          tagName: 'header',
          children: [
            {
              tagName: 'h1',
              style: {
                color: { type: 'theme', path: 'text' },
                backgroundColor: { type: 'theme', path: 'background' },
                marginBottom: { value: 1, unit: 'em' },
                fontFamily: 'heading',
                fontSize: { value: 3, unit: 'rem' },
                fontWeight: '800',
                lineHeight: { value: 1.25, unit: 'number' },
                marginTop: { value: 0, unit: 'px' },
                textTransform: 'none',
                letterSpacing: 'normal',
              },
              children: [{ type: 'text', value: 'Heading 1' }],
            },
            {
              tagName: 'h2',
              style: {
                color: { type: 'theme', path: 'text' },
                backgroundColor: { type: 'theme', path: 'background' },
                marginBottom: { value: 1, unit: 'em' },
                fontFamily: 'heading',
                fontSize: { value: 2, unit: 'rem' },
                fontWeight: '800',
                lineHeight: { value: 1.25, unit: 'number' },
                marginTop: { value: 0, unit: 'px' },
                textTransform: 'none',
                letterSpacing: 'normal',
              },
              children: [{ type: 'text', value: 'Heading 2' }],
            },
            {
              tagName: 'h3',
              style: {
                color: { type: 'theme', path: 'text' },
                backgroundColor: { type: 'theme', path: 'background' },
                marginBottom: { value: 1, unit: 'em' },
                fontFamily: 'heading',
                fontSize: { value: 1.5, unit: 'rem' },
                fontWeight: '800',
                lineHeight: { value: 1.25, unit: 'number' },
                marginTop: { value: 0, unit: 'px' },
                textTransform: 'none',
                letterSpacing: 'normal',
              },
              children: [{ type: 'text', value: 'Heading 3' }],
            },
            {
              tagName: 'h4',
              style: {
                color: { type: 'theme', path: 'text' },
                backgroundColor: { type: 'theme', path: 'background' },
                marginBottom: { value: 1, unit: 'em' },
                fontFamily: 'heading',
                fontSize: { value: 1.25, unit: 'rem' },
                fontWeight: '800',
                lineHeight: { value: 1.25, unit: 'number' },
                marginTop: { value: 0, unit: 'px' },
                textTransform: 'none',
                letterSpacing: 'normal',
              },
              children: [{ type: 'text', value: 'Heading 4' }],
            },
            {
              tagName: 'h5',
              style: {
                color: { type: 'theme', path: 'text' },
                backgroundColor: { type: 'theme', path: 'background' },
                marginBottom: { value: 1, unit: 'em' },
                fontFamily: 'heading',
                fontSize: { value: 1, unit: 'rem' },
                fontWeight: '800',
                lineHeight: { value: 1.25, unit: 'number' },
                marginTop: { value: 1, unit: 'px' },
                textTransform: 'none',
                letterSpacing: 'normal',
              },
              children: [{ type: 'text', value: 'Heading 5' }],
            },
            {
              tagName: 'h6',
              style: {
                color: { type: 'theme', path: 'text' },
                backgroundColor: { type: 'theme', path: 'background' },
                marginBottom: { value: 1, unit: 'em' },
                fontFamily: 'heading',
                fontSize: { value: 0.75, unit: 'rem' },
                fontWeight: '800',
                lineHeight: { value: 1.25, unit: 'number' },
                marginTop: { value: 0, unit: 'px' },
                textTransform: 'none',
                letterSpacing: 'normal',
              },
              children: [{ type: 'text', value: 'Heading 6' }],
            },
          ],
        },
        {
          tagName: 'div',
          children: [
            {
              tagName: 'b',
              children: [{ type: 'text', value: 'Bold text' }],
            },
            { tagName: 'br' },
            {
              tagName: 'strong',
              children: [{ type: 'text', value: 'Strong text' }],
            },
            { tagName: 'br' },
            {
              tagName: 'i',
              children: [{ type: 'text', value: 'Italic text' }],
            },
            { tagName: 'br' },
            {
              tagName: 'em',
              children: [{ type: 'text', value: 'Emphasized text' }],
            },
            { tagName: 'br' },
            {
              tagName: 'u',
              children: [{ type: 'text', value: 'Underlined text' }],
            },
            { tagName: 'br' },
            {
              tagName: 's',
              children: [{ type: 'text', value: 'Strikethrough text' }],
            },
            { tagName: 'br' },
            {
              tagName: 'small',
              children: [{ type: 'text', value: 'Small text' }],
            },
            { tagName: 'br' },
            {
              tagName: 'sub',
              children: [{ type: 'text', value: 'Subscript text' }],
            },
            { tagName: 'br' },
            {
              tagName: 'sup',
              children: [{ type: 'text', value: 'Superscript text' }],
            },
          ],
        },
        {
          tagName: 'a',
          attributes: { href: '#0', title: 'Anchor link: <a>' },
          style: {
            color: { type: 'theme', path: 'text' },
            backgroundColor: { type: 'theme', path: 'background' },
            fontWeight: 'inherit',
            textDecoration: {
              color: 'currentcolor',
              line: 'underline',
              style: 'solid',
              thickness: { value: 1, unit: 'px' },
            },
          },
          children: [{ type: 'text', value: 'A text link' }],
        },
        {
          tagName: 'time',
          children: [{ type: 'text', value: '5 OCT 2048' }],
        },
        {
          tagName: 'code',
          children: [
            { type: 'text', value: 'const x = 1024;' },
            { tagName: 'br' },
            { type: 'text', value: 'const y = 512;' },
            { tagName: 'br' },
            { type: 'text', value: 'const coordinate = [x,y];' },
          ],
        },
        {
          tagName: 'ul',
          attributes: {
            title: 'Unordered list: <ul>',
          },
          children: [
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Oranges' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Apples' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Peaches' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Plums' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Mangos' }],
            },
          ],
        },
        {
          tagName: 'ol',
          attributes: {
            title: 'Ordered list: <ol>',
          },
          children: [
            {
              tagName: 'li',
              attributes: {
                title: 'List item: <li>',
              },
              children: [{ type: 'text', value: 'Item 1' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Item 2' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Item 3' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Item 4' }],
            },
            {
              tagName: 'li',
              children: [{ type: 'text', value: 'Item 5' }],
            },
          ],
        },
        {
          tagName: 'dl',
          attributes: {
            title: 'Definition List: <dl>',
          },
          children: [
            {
              attributes: {
                title: 'Definition term: <dt>',
              },
              tagName: 'dt',
              style: {
                color: 'inherit',
                backgroundColor: 'inherit',
                fontSize: { value: 1, unit: 'rem' },
                fontWeight: '400',
              },
              children: [{ type: 'text', value: 'Generated designs' }],
            },
            {
              tagName: 'dd',
              attributes: {
                title: 'Definition description: <dd>',
              },
              style: {
                color: 'inherit',
                backgroundColor: 'inherit',
                fontSize: { value: 2, unit: 'rem' },
                fontWeight: '600',
                marginLeft: { value: 0, unit: 'px' },
              },
              children: [{ type: 'text', value: '3.4 Million' }],
            },
          ],
        },
        {
          tagName: 'blockquote',
          style: {
            borderLeftWidth: { value: 4, unit: 'px' },
            borderLeftColor: '#4e4fec',
            borderLeftStyle: 'solid',
            marginLeft: { value: 0, unit: 'px' },
            paddingLeft: { value: 32, unit: 'px' },
          },
          attributes: {
            title: 'Blockquote: <blockquote>',
          },
          children: [
            {
              type: 'text',
              value:
                '"The aim of every typographic work - the delivery of a message in the shortest, most efficient manner." - Jan Tschichold',
            },
          ],
        },
        {
          tagName: 'abbr',
          attributes: {
            title: 'Abbreviation: <abbr>',
          },
          children: [{ type: 'text', value: 'Abbr' }],
        },
        {
          tagName: 'cite',
          attributes: {
            title: 'Cited text: cite',
          },
          children: [{ type: 'text', value: 'Cite element' }],
        },
        {
          tagName: 'mark',
          attributes: {
            title: 'Marked text: <mark>',
          },
          style: {
            color: 'inherit',
            backgroundColor: '#6465ff',
            fontStyle: 'normal',
            fontWeight: 'inherit',
          },
          children: [{ type: 'text', value: 'This text is marked' }],
        },
        {
          tagName: 'table',
          style: {
            gridColumn: 'span 3',
          },
          children: [
            {
              tagName: 'thead',
              children: [
                {
                  tagName: 'tr',
                  children: [
                    {
                      tagName: 'th',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Name' }],
                    },
                    {
                      tagName: 'th',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Email' }],
                    },
                    {
                      tagName: 'th',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Favorite typeface' }],
                    },
                  ],
                },
              ],
            },
            {
              tagName: 'tfoot',
              children: [],
            },
            {
              tagName: 'tbody',
              children: [
                {
                  tagName: 'tr',
                  children: [
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Tanner' }],
                    },
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'tanner@example.com' }],
                    },
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Garamond' }],
                    },
                  ],
                },
                {
                  tagName: 'tr',
                  children: [
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Finley' }],
                    },
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'finley@example.com' }],
                    },
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Space Mono' }],
                    },
                  ],
                },
                {
                  tagName: 'tr',
                  children: [
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Payton' }],
                    },
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'payton@example.com' }],
                    },
                    {
                      tagName: 'td',
                      style: {
                        textAlign: 'left',
                      },
                      children: [{ type: 'text', value: 'Bodini' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      tagName: 'section',
      children: [{}],
    },
  ],
}

export const initialComponents: any = [
  {
    type: 'component',
    id: '123abc',
    tagName: 'Heading',
    swappableComponentIds: ['456def', '789ghi'],
    value: {
      tagName: 'h1',
      attributes: {
        title: {
          type: 'slot',
          name: 'title',
          value: 'The title for heading 1',
        },
      },
      style: {
        color: '#4e4fec',
        fontSize: {
          type: 'responsive',
          values: [
            {
              value: 4,
              unit: 'rem',
            },
            {
              value: 6,
              unit: 'rem',
            },
            {
              value: 10,
              unit: 'rem',
            },
          ],
        },
        fontWeight: '900',
        fontFamily: 'Inter',
        letterSpacing: { value: -8, unit: 'px' },
        marginTop: {
          value: 0,
          unit: 'px',
        },
        marginBottom: {
          value: 0,
          unit: 'px',
        },
        lineHeight: {
          value: 1.25,
          unit: 'number',
        },
      },
      children: [{ type: 'slot', name: 'children', value: 'CSS.GUI' }],
    },
  },
  {
    type: 'component',
    id: '456def',
    tagName: 'Heading2',
    swappableComponentIds: ['123abc', '789ghi'],
    value: {
      tagName: 'h1',
      attributes: {
        title: {
          type: 'slot',
          name: 'title',
          value: 'The title for heading 2',
        },
      },
      style: {
        color: 'tomato',
        fontSize: {
          type: 'responsive',
          values: [
            {
              value: 4,
              unit: 'rem',
            },
            {
              value: 6,
              unit: 'rem',
            },
            {
              value: 10,
              unit: 'rem',
            },
          ],
        },
        fontWeight: '900',
        fontFamily: 'Inter',
        letterSpacing: { value: -8, unit: 'px' },
        marginTop: {
          value: 0,
          unit: 'px',
        },
        marginBottom: {
          value: 0,
          unit: 'px',
        },
        lineHeight: {
          value: 1.25,
          unit: 'number',
        },
      },
      children: [{ type: 'slot', name: 'children', value: 'CSS.GUI' }],
    },
  },
  {
    type: 'component',
    id: '789ghi',
    tagName: 'Heading3',
    swappableComponentIds: ['123abc', '456def'],
    value: {
      tagName: 'h1',
      attributes: {
        title: {
          type: 'slot',
          name: 'title',
          value: 'The title for heading 2',
        },
      },
      style: {
        color: 'papayawhip',
        fontSize: {
          type: 'responsive',
          values: [
            {
              value: 4,
              unit: 'rem',
            },
            {
              value: 6,
              unit: 'rem',
            },
            {
              value: 10,
              unit: 'rem',
            },
          ],
        },
        fontWeight: '900',
        fontFamily: 'Inter',
        letterSpacing: { value: -8, unit: 'px' },
        marginTop: {
          value: 0,
          unit: 'px',
        },
        marginBottom: {
          value: 0,
          unit: 'px',
        },
        lineHeight: {
          value: 1.25,
          unit: 'number',
        },
      },
      children: [{ type: 'slot', name: 'children', value: 'CSS.GUI' }],
    },
  },
  {
    type: 'component',
    id: 'aabbcc',
    tagName: 'NavLink',
    value: {
      tagName: 'a',
      attributes: {
        href: '#!',
        title: {
          type: 'slot',
          name: 'title',
          value: 'A nav link',
        },
      },
      style: {
        color: 'tomato',
        fontWeight: '500',
        lineHeight: {
          value: 1,
          unit: 'number',
        },
      },
      children: [{ type: 'slot', name: 'children', value: 'CSS.GUI' }],
    },
  },
  {
    type: 'component',
    id: 'ddeeff',
    tagName: 'Footer',
    value: {
      tagName: 'footer',
      attributes: {},
      style: {},
      children: [
        {
          type: 'element',
          tagName: 'h1',
          attributes: {},
          style: {},
          children: [{ type: 'text', value: 'A footer!!!!' }],
        },
      ],
    },
  },
  {
    type: 'component',
    id: 'ddeeff123',
    tagName: 'Input',
    attributes: {},
    value: {
      type: 'element',
      tagName: 'input',
      attributes: {},
      style: {},
    },
  },
  {
    type: 'component',
    id: 'ddeeff456',
    tagName: 'Email Input',
    attributes: {},
    value: {
      tagName: 'label',
      attributes: {},
      style: {},
      children: [
        {
          type: 'element',
          tagName: 'span',
          attributes: {},
          children: [{ type: 'text', value: 'Email' }],
        },
        {
          type: 'component',
          tagName: 'Input',
          attributes: {},
          value: {
            type: 'element',
            tagName: 'input',
            attributes: {},
            style: {},
          },
        },
      ],
    },
  },
]
