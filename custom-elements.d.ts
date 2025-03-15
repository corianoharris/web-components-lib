declare namespace JSX
{
    interface IntrinsicElements
    {
        'ui-navbar': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
            logo?: string;
            theme?: string;
        }, HTMLElement>;

        'ui-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
            variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
            size?: 'small' | 'medium' | 'large';
            disabled?: boolean;
            loading?: boolean;
        }, HTMLElement>;

        'ui-card': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
            variant?: 'default' | 'outlined' | 'elevated';
            hover?: boolean;
        }, HTMLElement>;

        'ui-modal': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
            open?: string | null;
            size?: 'small' | 'medium' | 'large' | 'fullscreen';
        }, HTMLElement>;

        'ui-tooltip': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
            position?: 'top' | 'bottom' | 'left' | 'right';
            'arrow-position'?: 'start' | 'center' | 'end';
            delay?: string;
        }, HTMLElement>;
    }
}