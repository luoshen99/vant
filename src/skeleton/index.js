import { createNamespace, addUnit } from '../utils';

const [createComponent, bem] = createNamespace('skeleton');
const DEFAULT_ROW_WIDTH = '100%';
const DEFAULT_LAST_ROW_WIDTH = '60%';

export default createComponent({
  props: {
    title: Boolean,
    round: Boolean,
    avatar: Boolean,
    row: {
      type: [Number, String],
      default: 0,
    },
    loading: {
      type: Boolean,
      default: true,
    },
    animate: {
      type: Boolean,
      default: true,
    },
    avatarSize: {
      type: String,
      default: '32px',
    },
    avatarShape: {
      type: String,
      default: 'round',
    },
    titleWidth: {
      type: [Number, String],
      default: '40%',
    },
    rowWidth: {
      type: [Number, String, Array],
      default: DEFAULT_ROW_WIDTH,
    },
  },

  setup(props, { slots }) {
    const renderAvatar = () => {
      if (props.avatar) {
        const size = addUnit(props.avatarSize);
        return (
          <div
            class={bem('avatar', props.avatarShape)}
            style={{ width: size, height: size }}
          />
        );
      }
    };

    const renderTitle = () => {
      if (props.title) {
        return (
          <h3
            class={bem('title')}
            style={{ width: addUnit(props.titleWidth) }}
          />
        );
      }
    };

    const getRowWidth = (index) => {
      const { rowWidth } = props;

      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }

      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }

      return rowWidth;
    };

    const renderRows = () => {
      const Rows = [];

      for (let i = 0; i < props.row; i++) {
        Rows.push(
          <div class={bem('row')} style={{ width: addUnit(getRowWidth(i)) }} />
        );
      }

      return Rows;
    };

    return () => {
      if (!props.loading) {
        return slots.default?.();
      }

      return (
        <div class={bem({ animate: props.animate, round: props.round })}>
          {renderAvatar()}
          <div class={bem('content')}>
            {renderTitle()}
            {renderRows()}
          </div>
        </div>
      );
    };
  },
});