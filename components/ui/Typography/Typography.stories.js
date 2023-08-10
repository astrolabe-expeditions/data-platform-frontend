import { Typography } from '.';

export default {
    component: Typography,
}

export const Default = {
    args: {
        children: "Text",
    }
}

export const Variants = {
    render: ({ children, ...args }) => (
        <div className='flex gap-2.5 flex-col'>
            <Typography variant='title'>Heading</Typography>
            <Typography variant='subtitle'>Subtitle</Typography>
            <Typography variant='body1'>body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
            <Typography variant='body2'>body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.</Typography>
        </div>
    )
}