export default `
:root {
  --author-img-size: 4em;
}

.author {
  display: grid;
  grid-template-columns: 4em 1fr;
  grid-gap: 20px;
}

.author__img-wrapper {
  display: inline-block;
  border-radius: 50%;
  width: var(--author-img-size);
  height: var(--author-img-size);
  overflow: hidden;
  transition: transform 0.2s var(--bounce);
}
.author__img-wrapper:hover {
  transform: scale(1.1);
}
.author__img-wrapper img {
  display: block;
  width: inherit;
  height: inherit;
  object-fit: cover;
}

.author__content a {
  color: inherit;
}
.author__content a:hover {
  color: var(--color-primary);
}

.author--meta {
  --author-img-size: 3em;
  align-items: center;
  grid-gap: var(--space-xs);
}

.author--minimal {
  --author-img-size: 2.4em;
  align-items: center;
  grid-gap: var(--space-xxs);
}

.author--featured {
  --author-img-size: 6em;
  grid-template-columns: 1fr;
  justify-content: center;
  text-align: center;
}
.author--featured .author__img-wrapper {
  margin-left: auto;
  margin-right: auto;
}

.author__social {
  display: inline-block;
  padding: var(--space-xs);
  background: var(--color-contrast-lower);
  border-radius: 50%;
  transition: 0.2s;
}
.author__social .icon {
  display: block;
  font-size: 16px;
  color: var(--color-contrast-high);
  transition: color 0.2s;
}
.author__social:hover {
  background-color: var(--color-bg);
  box-shadow: var(--shadow-sm);
}
.author__social:hover .icon {
  color: var(--color-primary);
}
`;
