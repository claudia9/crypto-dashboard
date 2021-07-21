import React, { useState } from 'react';

type DropdownProps = {
    items: any[],
    onAdd: (id: string) => void
}

export const Dropdown = ({ items, onAdd }: DropdownProps) => {
    const [open, setOpen] = useState<boolean>(false);

    if (items.length <= 0) {
        return null;
    }
    return (
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => setOpen(!open)}> Add currencies</button>
            <ul className={"dropdown-menu scrollable-menu " + (open ? "show" : "")} aria-labelledby="dropdownMenuButton1">
                {items.map((i) => {
                    return <li key={i.id} className="dropdown-item" onClick={() => onAdd(i.id)}><p>{i.name}</p></li>
                })}
            </ul>
        </div>
    )
}

export default Dropdown;