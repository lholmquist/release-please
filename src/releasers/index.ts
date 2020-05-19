// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ReleasePR} from '../release-pr';

import {readdirSync} from 'fs';
import {dirname} from 'path';

// dynamically load all the releasers in the folder, and index based on their
// releaserName property:
const releasers: typeof ReleasePR[] = [];
const root = dirname(require.resolve('./'));
for (const file of readdirSync(root, {withFileTypes: true})) {
  if (
    file.isFile() &&
    !file.name.match(/.*\.ts.*/) &&
    !file.name.match(/.*\.map$/) &&
    !file.name.match(/index\.js/)
  ) {
    const obj = require(`./${file.name}`) as {[key: string]: typeof ReleasePR};
    releasers.push(obj[Object.keys(obj)[0]]);
  }
}

export function getReleaserNames(): string[] {
  return releasers.map(releaser => {
    console.info(releaser.releaserName);
    return releaser.releaserName;
  });
}

export default releasers;
