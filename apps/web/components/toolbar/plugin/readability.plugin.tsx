import { handleToggleReadability } from "@/app/actions";
import { useColorStore } from "@/store/store";
import { Switch } from "@ui/components/ui/switch";
import { Label } from "@ui/components/ui/label";
import { Fragment } from "react";

function ReadabilityPlugin() {
  const { showReadability } = useColorStore();
  return (
    <Fragment>
      <div className="prose prose-sm rounded border p-4 dark:prose-invert">
        <h2>Contrast Ratio Guide</h2>
        <p>
          The border styles around the color values indicate their contrast
          ratios, as defined by the{" "}
          <a
            href="https://www.w3.org/WAI/standards-guidelines/wcag/"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
          >
            W3C Web Content Accessibility Guidelines
          </a>
          :
        </p>
        <ul>
          <li>
            <span className="-my-0.5 rounded border-border px-1 py-0.5 ring-1 ring-inset ring-primary ring-offset-2 ring-offset-border">
              Double Border
            </span>
            : Indicates a contrast ratio of 7:1 or higher. Complies with Level
            AAA.
          </li>
          <li>
            <span className="-my-0.5 rounded border border-accent-foreground px-1 py-0.5">
              Single Border
            </span>
            : Indicates a contrast ratio between 4.5:1 and 6.9:1. Complies with
            Level AA.
          </li>
          <li>
            <span className="-my-0.5 rounded border border-dashed px-1 py-0.5">
              Dashed Border
            </span>
            : Indicates a contrast ratio between 3:1 and 4.4:1. Suitable for
            large text.
          </li>
          <li>
            <span>No Border</span>: Indicates a contrast ratio below 3:1. Does
            not meet accessibility guidelines.
          </li>
        </ul>
        <p>
          Note: The left number represents the contrast ratio of{" "}
          <strong>current color</strong> to <strong>foreground</strong> color,
          and the right number represents the contrast ratio of{" "}
          <strong>current color</strong> to <strong>background</strong> color.
        </p>
      </div>
      <div className="mt-2 flex w-full items-center justify-between space-x-1.5">
        <Label htmlFor="toggle-readability" className="text-foreground/80">
          Toggle Readability
        </Label>
        <Switch
          id="toggle-readability"
          onCheckedChange={(c) => {
            handleToggleReadability(`${c}`);
            useColorStore.setState({ showReadability: c });
          }}
          checked={showReadability}
          aria-label="Toggle Readability"
        />
      </div>
    </Fragment>
  );
}

export default ReadabilityPlugin;
