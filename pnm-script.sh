#!/bin/bash

# Make sure you are in the root directory of your project
# and have pnpm and shadcn CLI installed.

# List of all ShadCN components you want to install
components=(
  "accordion"
  "alert"
  "aspect-ratio"
  "avatar"
  "badge"
  "button"
  "calendar"
  "card"
  "checkbox"
  "collapsible"
  "command"
  "context-menu"
  "dialog"
  "dropdown-menu"
  "hover-card"
  "input"
  "label"
  "menubar"
  "navigation-menu"
  "popover"
  "progress"
  "radio-group"
  "scroll-area"
  "select"
  "separator"
  "sheet"
  "slider"
  "switch"
  "table"
  "tabs"
  "textarea"
  "toast"
  "tooltip"
)
# Loop through and install each component
for component in "${components[@]}"
do
  pnpm dlx shadcn@latest add $component
done

echo "All ShadCN components installed successfully."
pnpm dlx shadcn@latest add accordion
