import { Type } from '@fastify/type-provider-typebox';

export const schemas = {
  // Settings:
  updateMyProfileUI: {
    body: Type.Object({
      profileUI: Type.Object({
        isLocked: Type.Boolean(),
        showAbout: Type.Boolean(),
        showCerts: Type.Boolean(),
        showDonation: Type.Boolean(),
        showHeatMap: Type.Boolean(),
        showLocation: Type.Boolean(),
        showName: Type.Boolean(),
        showPoints: Type.Boolean(),
        showPortfolio: Type.Boolean(),
        showTimeLine: Type.Boolean()
      })
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('flash.privacy-updated'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  updateMyTheme: {
    body: Type.Object({
      theme: Type.Union([Type.Literal('default'), Type.Literal('night')])
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('flash.updated-themes'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  updateMyUsername: {
    body: Type.Object({
      username: Type.String({ minLength: 3, maxLength: 1000 })
    }),
    response: {
      200: Type.Object({
        message: Type.String(),
        type: Type.Literal('success'),
        username: Type.String()
      }),
      400: Type.Object({
        message: Type.Optional(Type.String()),
        type: Type.Literal('info')
      }),
      500: Type.Object({
        message: Type.String(),
        type: Type.Literal('danger')
      })
    }
  },
  updateMySocials: {
    body: Type.Object({
      website: Type.Optional(Type.String({ format: 'url', maxLength: 1024 })),
      twitter: Type.Optional(Type.String({ format: 'url', maxLength: 1024 })),
      githubProfile: Type.Optional(
        Type.String({ format: 'url', maxLength: 1024 })
      ),
      linkedin: Type.Optional(Type.String({ format: 'url', maxLength: 1024 }))
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('flash.updated-socials'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  updateMyKeyboardShortcuts: {
    body: Type.Object({
      keyboardShortcuts: Type.Boolean()
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('flash.keyboard-shortcut-updated'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  updateMyQuincyEmail: {
    body: Type.Object({
      sendQuincyEmail: Type.Boolean()
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('flash.subscribe-to-quincy-updated'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  updateMyHonesty: {
    body: Type.Object({
      isHonest: Type.Literal(true)
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('buttons.accepted-honesty'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  updateMyAbout: {
    body: Type.Object({
      about: Type.Optional(Type.String()),
      name: Type.Optional(Type.String()),
      picture: Type.Optional(Type.String()),
      location: Type.Optional(Type.String())
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('flash.updated-about-me'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  updateMyPrivacyTerms: {
    body: Type.Object({
      quincyEmails: Type.Boolean()
    }),
    response: {
      200: Type.Object({
        message: Type.Literal('flash.privacy-updated'),
        type: Type.Literal('success')
      }),
      500: Type.Object({
        message: Type.Literal('flash.wrong-updating'),
        type: Type.Literal('danger')
      })
    }
  },
  // User:
  deleteMyAccount: {
    response: {
      200: Type.Object({}),
      500: Type.Object({
        message: Type.Literal(
          'Oops! Something went wrong. Please try again in a moment or contact support@freecodecamp.org if the error persists.'
        ),
        type: Type.Literal('danger')
      })
    }
  },
  resetMyProgress: {
    response: {
      200: Type.Object({}),
      500: Type.Object({
        message: Type.Literal(
          'Oops! Something went wrong. Please try again in a moment or contact support@freecodecamp.org if the error persists.'
        ),
        type: Type.Literal('danger')
      })
    }
  },
  getSessionUser: {
    response: {
      200: Type.Object({
        user: Type.Record(
          Type.String(),
          Type.Object({
            about: Type.String(),
            acceptedPrivacyTerms: Type.Boolean(),
            calendar: Type.Record(Type.Number(), Type.Literal(1)),
            completedChallenges: Type.Array(
              Type.Object({
                id: Type.String(),
                completedDate: Type.Number(),
                solution: Type.Optional(Type.String()),
                githubLink: Type.Optional(Type.String()),
                challengeType: Type.Number(),
                files: Type.Array(Type.Object({})),
                isManuallyApproved: Type.Optional(Type.Boolean())
              })
            ), // TODO: provide shape for files
            completedChallengeCount: Type.Number(),
            currentChallengeId: Type.Optional(Type.String()),
            donationEmails: Type.Array(Type.String()), // TODO: remove once it's gone from api-server
            email: Type.String(),
            emailVerified: Type.Boolean(),
            githubProfile: Type.Optional(Type.String()),
            id: Type.String(),
            isApisMicroservicesCert: Type.Optional(Type.Boolean()),
            isBackEndCert: Type.Optional(Type.Boolean()),
            isCheater: Type.Optional(Type.Boolean()),
            isDonating: Type.Boolean(),
            is2018DataVisCert: Type.Optional(Type.Boolean()),
            isDataVisCert: Type.Optional(Type.Boolean()),
            isFrontEndCert: Type.Optional(Type.Boolean()),
            isFullStackCert: Type.Optional(Type.Boolean()),
            isFrontEndLibsCert: Type.Optional(Type.Boolean()),
            isHonest: Type.Optional(Type.Boolean()),
            isInfosecCertV7: Type.Optional(Type.Boolean()),
            isInfosecQaCert: Type.Optional(Type.Boolean()),
            isQaCertV7: Type.Optional(Type.Boolean()),
            isJsAlgoDataStructCert: Type.Optional(Type.Boolean()),
            isRelationalDatabaseCertV8: Type.Optional(Type.Boolean()),
            isRespWebDesignCert: Type.Optional(Type.Boolean()),
            isSciCompPyCertV7: Type.Optional(Type.Boolean()),
            isDataAnalysisPyCertV7: Type.Optional(Type.Boolean()),
            isMachineLearningPyCertV7: Type.Optional(Type.Boolean()),
            isCollegeAlgebraPyCertV8: Type.Optional(Type.Boolean()),
            keyboardShortcuts: Type.Optional(Type.Boolean()),
            linkedin: Type.Optional(Type.String()),
            location: Type.Optional(Type.String()),
            name: Type.Optional(Type.String()),
            partiallyCompletedChallenges: Type.Optional(
              Type.Array(Type.Object({}))
            ), // TODO: add shape
            picture: Type.String(), // TODO(Post-MVP): format as url/uri?
            points: Type.Number(),
            portfolio: Type.Array(Type.Object({})), // TODO: add shape
            profileUI: Type.Optional(Type.Object({})), // TODO: add shape
            sendQuincyEmail: Type.Boolean(),
            theme: Type.Optional(Type.String()),
            twitter: Type.Optional(Type.String()),
            website: Type.Optional(Type.String()),
            yearsTopContributor: Type.Array(Type.String()), // TODO(Post-MVP): convert to number?
            sound: Type.Optional(Type.Boolean()),
            isEmailVerified: Type.Boolean(),
            joinDate: Type.String(),
            savedChallenges: Type.Optional(Type.Object({})), // TODO: add shape
            username: Type.String(),
            userToken: Type.Optional(Type.String())
          })
        ),
        result: Type.String()
      })
      // TODO: is there a better status code? Is it really a server error?
      // TODO: add this back in once the success response is typed.
      // 500: Type.Object({
      //   user: Type.Object({}),
      //   result: Type.Literal('')
      // })
    }
  },
  // Deprecated endpoints:
  deprecatedEndpoints: {
    response: {
      410: Type.Object({
        message: Type.Object({
          type: Type.Literal('info'),
          message: Type.Literal(
            'Please reload the app, this feature is no longer available.'
          )
        })
      })
    }
  }
};
