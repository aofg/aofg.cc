<template>
  <section v-bem>
    <Heading hero v-bem:title.hero>
      Typography
    </Heading>

    <Heading :level='0' v-bem:title.h0>H0</Heading>
    <Heading :level='1' v-bem:title.h1>H1</Heading>
    <Heading :level='2' v-bem:title.h2>H2</Heading>
    <Heading :level='3' v-bem:title.h3>H3</Heading>
    <Heading :level='4' v-bem:title.h4>H4</Heading>
    <Heading :level='5' v-bem:title.h5>H5</Heading>

    <Heading :level='1' lat v-bem:title.h1.alt>Alt H1 style</Heading>
    <Heading :level='2' lat v-bem:title.h2.alt>Alt H2 style</Heading>

    <Paragraph>
      This is paragraph text.
    </Paragraph>

    <Note>
      Note/Comment text
    </Note>

    <Container v-bem:container.demo>
      <Heading v-bem:title.h3.demo>Lists</Heading>  

      <OrderedList v-bem:list.ordered>
        <ListItem v-bem:list-item>
          <Text v-bem:text.demo>List item</Text>
          <OrderedList v-bem:list.ordered.nested>
            <ListItem v-bem:list-item>
              <Text v-bem:text.demo>List item</Text>
            </ListItem>
            <ListItem v-bem:list-item>
              <Text v-bem:text.demo>List item</Text>
            </ListItem>
          </OrderedList>
        </ListItem>
        <ListItem v-bem:list-item>
          <Text v-bem:text.demo>List item</Text>
          <UnorderedList v-bem:list.unordered.nested>
            <ListItem v-bem:list-item>
              <Text v-bem:text.demo>List item</Text>
            </ListItem>
            <ListItem v-bem:list-item>
              <Text v-bem:text.demo>List item</Text>
            </ListItem>
          </UnorderedList>
        </ListItem>
        <ListItem v-bem:list-item>
          <Paragraph v-bem:paragraph.demo>
            Third item with paragraph inside
          </Paragraph>
          <Paragraph v-bem:paragraph.demo>
            You may buy a pack horse or pack llama from any animal trainer, the vet and some ranchers. The carrying capacity of a pack animal is 1600 stones, horses and llamas both require one follower slot.
          </Paragraph>
        </ListItem>
      </OrderedList>
    </Container>
    <Container v-bem:container.demo>
      <Heading v-bem:title.h3.demo>Code</Heading>  
      <Paragraph v-bem:paragraph.demo>
        <Text v-bem:text.inside.demo>Inline </Text>
        <Text code v-bem:text.code.inside.demo>code</Text>
        <Text v-bem:text.inside.demo> hash </Text>
        <Text cod v-bem:text.code.inside.demo>>back-ticks around</Text>
        <Text v-bem:text.inside.demo> it.</Text>
      </Paragraph>
      <Paragraph v-bem:paragraph.demo>
        Code block, 1 line
      </Paragraph>

      <CodeBlock v-bem:code.demo>
Alternatively, for H1 and H2, an underline-ish style:
      </CodeBlock>
      <Paragraph v-bem:paragraph.demo>
        Alternatively, for H1 and H2, an underline-ish style:
      </Paragraph>

      <CodeBlock v-bem:code.demo>
# H1
Alternatively, for H1 and H2, an underline-ish style:
      </CodeBlock>
      <Paragraph v-bem:paragraph.demo>
        Max height of code block is 512 px. This version is with syntax highlighting (prism.js)
      </Paragraph>

      <CodeBlock lang="css" highlight v-bem:code.highlight.css.demo>
@import url(https://fonts.googleapis.com/css?family=Questrial);
@import url(https://fonts.googleapis.com/css?family=Arvo);
@font-face {
	src: url(https://lea.verou.me/logo.otf);
	font-family: 'LeaVerou';
}

/*
 Shared styles
 */

section h1,
#features li strong,
header h2 {
	font: 100% Rockwell, Arvo, serif;
}

/*
Styles
*/
      </CodeBlock>
    </Container>
    <Container v-bem:container.demo>
      <Heading v-bem:title.h3.demo>Blockquotes</Heading>
      <Blockquote v-bem:blockquote.demo>
        Blockquotes are very handy in email to emulate reply text. This line is part of the same quote.
      </Blockquote>

      <Paragraph v-bem:paragraph.demo>
        Quote break.
      </Paragraph>

      <Blockquote v-bem:blockquote.demo>
        <Text v-bem:text.inside.demo>This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can put </Text>
        <Text bold v-bem:text.inside.demo>Markdown</Text>
        <Text v-bem:text.inside.demo> into a blockquote.</Text>
      </Blockquote>
    </Container>

    <Container v-bem:container.demo>
      <Heading v-bem:title.h3.demo>Horizontal rule</Heading>

      <Paragraph v-bem:paragraph.demo>
        Horizontal rule
      </Paragraph>

      <HLine />
    </Container>
  </section>
  <!-- <div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
    <div class="sm:flex sm:items-center px-6 py-4">
      <img
        class="h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
        src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4"
        alt
      >
      <div class="text-center sm:text-left sm:flex-grow">
        <div class="mb-4">
          <p class="text-xl leading-tight">Adam Wathan</p>
          <p class="text-sm leading-tight text-grey-dark">Developer at NothingWorks Inc.</p>
        </div>
        <div>
          <button
            class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white"
          >Message</button>
        </div>
      </div>
    </div>
  </div> -->
  <!-- div(:class="b()")
      h2.is-size-1 {{ $t('recent-transactions') }}
      p Sample that shows how to fetch a secret from Azure Key Vault at run-time from an Function App with a User Assigned Managed Service Identity (MSI).
  -->
</template>


<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";
import { State } from "vuex-class";

@Component(<any>{
  name: "page",
  components: {}
})
export default class extends Vue {
  @State locale: string;
}
</script>