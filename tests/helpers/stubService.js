import Service from '@ember/service';
import { getContext } from '@ember/test-helpers';

export default function stubService(serviceName, serviceHash = {}) {
  const { owner } = getContext();
  const stubbedService = Service.extend(serviceHash);
  owner.register(`service:${serviceName}`, stubbedService);
}
