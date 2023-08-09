import { Button } from './Button';

export default {
    component: Button,
}

export const Default = {
    args: {
        label: "Default",
    }
};

export const Size = {
    args: {
        label: "Default",
    },
    render: ({ ...args }) => (
        <div className='flex gap-2.5 items-start'>
            <Button size='sm' {...args} />
            <Button size='md' {...args} />
            <Button size='lg' {...args} />
            <Button size='xl' {...args} />
            <Button size='2xl' {...args} />
        </div>
    )
}

export const Disabled = {
    args: {
        label: "Default",
        disabled: true
    },
}
