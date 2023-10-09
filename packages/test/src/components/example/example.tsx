import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'test-example',
  styleUrl: 'scss/index.scss',
  shadow: true,
})
export class Example {
  render() {
    return (
      <Host>
        <sy-text>Hello!</sy-text>
      </Host>
    );
  }
}
