import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from 'server'; // TODO: need to fix dependency
import { GITHUB_API_ENDPOINTS } from '../../lib/services/GithubService';
import httpMocks from '../helpers/httpMocks';
import githubClosedIssueData from '../data/github/issues/closed.json';

chai.use(chaiHttp);

describe('Test github controller', () => {
  describe('GET /api/github-demo/closed_issues', () => {
    it('should return closed issues', async () => {
      const [owner, repo] = ['imheretw', 'imhere'];

      httpMocks.githubHttpMock
        .get(GITHUB_API_ENDPOINTS.closedIssues(owner, repo))
        .reply(200, githubClosedIssueData);

      const res = await chai.request(server.expressServer)
        .get('/api/github-demo/closed_issues');

      const issues = res.body.issues;
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(issues).to.a('array');
      expect(issues.length).to.gt(1);
      expect(issues[0]).to.have.property('title', 'Kue screenshot');
    });
  });
});
