import type { Project } from '@/lib/types';
import { steadant } from './projects/steadant';
import { blocnet } from './projects/blocnet';
import { digitTally } from './projects/digit-tally';
import { foodJunkee } from './projects/food-junkee';
import { sixtySevenHf } from './projects/sixty-seven-hf';
import { vomChurch } from './projects/vom-church';
import { asikoFoods } from './projects/asiko-foods';
import { olamideSax } from './projects/olamide-sax';
import { mrOshodi } from './projects/mr-oshodi';

export const selectedWork: Project[] = [
  steadant,
  blocnet,
  digitTally,
  foodJunkee,
  sixtySevenHf,
  vomChurch,
  asikoFoods,
  olamideSax,
  mrOshodi,
];
